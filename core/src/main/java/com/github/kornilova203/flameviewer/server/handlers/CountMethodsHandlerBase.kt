package com.github.kornilova203.flameviewer.server.handlers

import com.github.kornilova203.flameviewer.FlameLogger
import com.github.kornilova203.flameviewer.converters.trees.Filter
import com.github.kornilova203.flameviewer.server.RequestHandlerBase
import com.github.kornilova203.flameviewer.server.RequestHandlingException
import com.github.kornilova203.flameviewer.server.ServerUtil
import com.google.gson.Gson
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.http.HttpRequest
import io.netty.handler.codec.http.QueryStringDecoder
import java.io.File

abstract class CountMethodsHandlerBase(private val logger: FlameLogger, private val findFile: FindFile) : RequestHandlerBase() {
    abstract fun countMethods(file: File, filter: Filter?, decoder: QueryStringDecoder): Int

    override fun processGet(request: HttpRequest, ctx: ChannelHandlerContext): Boolean {
        val decoder = QueryStringDecoder(request.uri())
        val file = findFile(getFileName(decoder))
                ?: throw RequestHandlingException("File not found. Uri: ${decoder.uri()}")
        val filter = getFilter(decoder, logger, true)
        val methodsCount = countMethods(file, filter, decoder)
        ServerUtil.sendJson(ctx, Gson().toJson(MethodsCounter.NodesCount(methodsCount)), logger)
        return true
    }
}
