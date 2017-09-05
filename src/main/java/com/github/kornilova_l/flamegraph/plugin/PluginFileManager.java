package com.github.kornilova_l.flamegraph.plugin;

import com.github.kornilova_l.flamegraph.plugin.server.jfr_converter.JMCFlightRecorderConverter;
import com.github.kornilova_l.flamegraph.plugin.server.trees.TreeManager.Extension;
import com.intellij.execution.runners.ProgramRunner;
import com.intellij.openapi.application.PathManager;
import io.netty.buffer.ByteBuf;
import io.netty.handler.codec.http.QueryStringDecoder;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipException;

import static com.github.kornilova_l.flamegraph.plugin.server.ProfilerHttpRequestHandler.getExtension;
import static com.github.kornilova_l.flamegraph.plugin.server.ProfilerHttpRequestHandler.getParameter;

public class PluginFileManager {
    private static final boolean isWindows = System.getProperty("os.name").startsWith("Windows");
    private static final String PLUGIN_DIR_NAME = "flamegraph-profiler";
    private static final String LOG_DIR_NAME = "log";
    private static final String CONFIG_DIR_NAME = "configuration";
    private static final String STATIC_DIR_NAME = "static";
    private static final String REQUEST_PREFIX = "/flamegraph-profiler/";
    private static final String UPLOADED_FILES = "uploaded-files";
    private static final String NOT_CONVERTED = "not-converted";
    private static final String SER_FILES = "ser";
    private static final String FLAMEGRAPH_FILES = "flamegraph";
    private static PluginFileManager pluginFileManager;
    @NotNull
    private final Path logDirPath;
    @NotNull
    private final Path configDirPath;
    @NotNull
    private final Path staticDirPath;
    @NotNull
    private final Path notConvertedFiles;
    @NotNull
    private final Path serFiles;
    @NotNull
    private final Path flamegraphFiles;

    private PluginFileManager(@NotNull String systemDirPath) {
        Path systemDir = Paths.get(systemDirPath);
        Path pluginDir = Paths.get(systemDir.toString(), PLUGIN_DIR_NAME);
        createDirIfNotExist(pluginDir);
        logDirPath = Paths.get(pluginDir.toString(), LOG_DIR_NAME);
        createDirIfNotExist(logDirPath);
        configDirPath = Paths.get(pluginDir.toString(), CONFIG_DIR_NAME);
        createDirIfNotExist(configDirPath);
        staticDirPath = Paths.get(
                new File(
                        getClass().getResource("/" + STATIC_DIR_NAME).getPath()
                ).getAbsolutePath()
        );
        @NotNull Path uploadedFilesPath = Paths.get(logDirPath.toString(), UPLOADED_FILES);
        createDirIfNotExist(uploadedFilesPath);
        notConvertedFiles = Paths.get(uploadedFilesPath.toString(), NOT_CONVERTED);
        createDirIfNotExist(notConvertedFiles);
        serFiles = Paths.get(uploadedFilesPath.toString(), SER_FILES);
        createDirIfNotExist(serFiles);
        flamegraphFiles = Paths.get(uploadedFilesPath.toString(), FLAMEGRAPH_FILES);
        createDirIfNotExist(flamegraphFiles);
        clearDir(new File(notConvertedFiles.toString()));
    }

    private void clearDir(File dir) {
        File[] files = dir.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            //noinspection ResultOfMethodCallIgnored
            file.delete();
        }
    }

    public static PluginFileManager getInstance() {
        if (pluginFileManager == null) {
            pluginFileManager = new PluginFileManager(PathManager.getSystemPath());
        }
        return pluginFileManager;
    }

    private static void createDirIfNotExist(@NotNull Path path) {
        File dir = new File(path.toString());
        if (!dir.exists()) {
            try {
                assert dir.mkdir();
            } catch (SecurityException se) {
                se.printStackTrace();
            }
        }
    }

    @Nullable
    private static File getLatestFile(File dir) {
        File[] files = dir.listFiles();
        if (files == null) {
            return null;
        }
        Optional<File> maxFile = Arrays.stream(files).max(Comparator.comparingLong(File::lastModified));
        return maxFile.orElse(null);
    }

    @Nullable
    public File getLogFile(QueryStringDecoder urlDecoder) {
        String projectName = getParameter(urlDecoder, "project");
        String fileName = getParameter(urlDecoder, "file");
        if (projectName == null || fileName == null) {
            return null;
        }
        return getLogFile(projectName, fileName);
    }

    public File getConfigurationFile(String projectName) {
        Path path = Paths.get(configDirPath.toString(), projectName + ".config");
        return new File(path.toString());
    }

    public File createLogFile(String projectName, String configurationName) {
        Path logDir = getLogDirPath(projectName);
        Path logFile = Paths.get(logDir.toString(),
                configurationName + "-" + new SimpleDateFormat("yyyy-MM-dd-HH_mm_ss").format(new Date()) + ".ser");
        return new File(logFile.toString());
    }

    @NotNull
    public List<FileNameAndDate> getFileNameList(@NotNull String projectName) {
        File projectLogDir = new File(getLogDirPath(projectName).toString());
        if (!Objects.equals(projectName, UPLOADED_FILES)) {
            return getFileNameList(projectLogDir);
        }
        List<FileNameAndDate> fileNames = new ArrayList<>();
        fileNames.addAll(getFileNameList(new File(serFiles.toString())));
        fileNames.addAll(getFileNameList(new File(flamegraphFiles.toString())));
        return fileNames;
    }

    @NotNull
    private List<FileNameAndDate> getFileNameList(File projectLogDir) {
        File[] files = projectLogDir.listFiles();
        if (files != null) {
            return Arrays.stream(files)
                    .filter(file -> !file.isDirectory())
                    .sorted((f1, f2) -> Long.compare(f2.lastModified(), f1.lastModified()))
                    .map(FileNameAndDate::new)
                    .collect(Collectors.toList());
        }
        return new LinkedList<>();
    }

    public void convertAndSave(ByteBuf byteBuf, String fileName) {
        Path filePath = Paths.get(flamegraphFiles.toString(), fileName);
        byte[] bytes = new byte[byteBuf.readableBytes()];
        byteBuf.readBytes(bytes);
        File unzippedFile = unzip(bytes);
        if (unzippedFile.length() > 30000000) {
//            new ProcessBuilder();
        } else {
            new JMCFlightRecorderConverter(unzip(bytes))
                    .writeTo(new File(filePath.toString()));
        }
    }

    public String getStaticFilePath(String staticFileUri) {
        Path path = Paths.get(
                staticDirPath.toString(),
                staticFileUri.substring(REQUEST_PREFIX.length(), staticFileUri.length())
        );
        return path.toString().replaceAll("%20", " ");
    }

    @NotNull
    private Path getLogDirPath(@NotNull String projectName) {
        Path path = Paths.get(logDirPath.toString(), projectName);
        createDirIfNotExist(path);
        return path;
    }

    @NotNull
    public String getPathToAgent() {
        String path = getClass().getResource("/javaagent.jar")
                .getPath()
                .replaceAll("%20", " ");
        if (isWindows) {
            path = path.substring(1, path.length()).replaceAll("/", "\\\\");
        }
        return path;
    }

    @Nullable
    private File getLogFile(String projectName, String fileName) {
        Path dirPath;
        if (!Objects.equals(projectName, UPLOADED_FILES)) {
            dirPath = getLogDirPath(projectName);
        } else {
            if (getExtension(fileName) == Extension.SER) {
                dirPath = serFiles;
            } else {
                dirPath = flamegraphFiles;
            }
        }

        File file = new File(Paths.get(dirPath.toString(), fileName).toString());
        if (file.exists()) {
            return file;
        }
        return null;
    }

    @Nullable
    public String getLatestFileName(@NotNull String projectName) {
        Path dirPath = Paths.get(logDirPath.toString(), projectName);
        File dir = new File(dirPath.toString());
        if (dir.exists() && dir.isDirectory()) {
            File latestFile = getLatestFile(dir);
            if (latestFile != null) {
                return latestFile.getName();
            }
        }
        return null;
    }

    @NotNull
    public List<String> getProjectList() {
        File logDir = new File(logDirPath.toString());
        if (logDir.exists() && logDir.isDirectory()) {
            File[] files = logDir.listFiles();
            if (files != null) {
                return Arrays.stream(files)
                        .filter(file ->
                                !Objects.equals(file.getName(), UPLOADED_FILES) &&
                                        file.isDirectory())
                        .map(File::getName)
                        .collect(Collectors.toList());
            }
        }
        return new ArrayList<>();
    }

    public void deleteFile(@NotNull String fileName, @NotNull String projectName) {
        File file = getLogFile(projectName, fileName);
        if (file == null || !file.exists()) {
            return;
        }
        //noinspection ResultOfMethodCallIgnored
        file.delete();
    }

    public boolean save(byte[] bytes, String fileName) {
        Path filePath = getSavePath(fileName);
        try (OutputStream outputStream = new FileOutputStream(new File(filePath.toString()))) {
            outputStream.write(bytes);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    private Path getSavePath(String fileName) {
        switch (getExtension(fileName)) {
            case JFR:
                return Paths.get(notConvertedFiles.toString(), fileName);
            case SER:
                return Paths.get(serFiles.toString(), fileName);
            case OTHER:
            default:
                return Paths.get(flamegraphFiles.toString(), fileName);
        }
    }

    public File unzip(byte[] bytes) {
        byte[] unzippedBytes = getUnzippedBytes(bytes);
        File file = new File(
                Paths.get(notConvertedFiles.toString(), "temp.jfr").toString());
        try (OutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(unzippedBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }

    private byte[] getUnzippedBytes(byte[] bytes) {
        try (InputStream inputStream = new GZIPInputStream(new ByteArrayInputStream(bytes));
             ByteArrayOutputStream bout = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) > 0) {
                bout.write(buffer, 0, len);
            }
            return bout.toByteArray();
        } catch (ZipException exception) {
            return bytes;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new byte[0];
    }

    static class FileNameAndDate {
        private static final Pattern nameWithoutDate = Pattern.compile(".*(?=-\\d\\d\\d\\d-\\d\\d-\\d\\d-\\d\\d_\\d\\d_\\d\\d(.*)?)");
        @SuppressWarnings("unused")
        private final String name;
        private final String fullName;
        @SuppressWarnings("unused")
        private final String date;
        @SuppressWarnings("unused")
        private final String id;

        FileNameAndDate(@NotNull File file) {
            this.fullName = file.getName();
            this.id = this.fullName.replaceAll("\\.", "").replaceAll(":", "");
            Matcher matcher = nameWithoutDate.matcher(this.fullName);
            if (matcher.find()) {
                this.name = matcher.group();
            } else {
                this.name = fullName;
            }
            this.date = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss").format(new Date(file.lastModified()));
        }
    }
}
