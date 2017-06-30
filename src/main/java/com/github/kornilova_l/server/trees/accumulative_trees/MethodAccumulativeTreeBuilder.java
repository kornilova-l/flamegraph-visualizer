package com.github.kornilova_l.server.trees.accumulative_trees;

import com.github.kornilova_l.protos.TreeProtos;
import com.github.kornilova_l.server.trees.TreeBuilderInterface;

import static com.github.kornilova_l.server.trees.accumulative_trees.AccumulativeTreesHelper.*;

public class MethodAccumulativeTreeBuilder implements TreeBuilderInterface {
    private TreeProtos.Tree.Builder treeBuilder;
    private TreeProtos.Tree tree;
    private TreeProtos.Tree.Node.Builder wantedMethodNode;
    private int maxDepth = 0;
    private String className;
    private String methodName;
    private String desc;
    private boolean isStatic;

    public MethodAccumulativeTreeBuilder(TreeProtos.Tree sourceTree,
                                      String className,
                                      String methodName,
                                      String desc,
                                      boolean isStatic) {
        this.className = className;
        this.methodName = methodName;
        this.desc = desc;
        this.isStatic = isStatic;
        initTreeBuilder();
        traverseTreeAndFind(sourceTree.getBaseNode());
        setNodesOffsetRecursively(treeBuilder.getBaseNodeBuilder(), 0);
        setTreeWidth(treeBuilder);
        treeBuilder.setDepth(maxDepth);
        tree = treeBuilder.build();
    }

    public TreeProtos.Tree getTree() {
        return tree;
    }

    private void traverseTreeAndFind(TreeProtos.Tree.Node node) {

        if (AccumulativeTreesHelper.isSameMethod(wantedMethodNode, node)) {
            addNodesRecursively(treeBuilder.getBaseNodeBuilder(), node, 0);
        }
        for (TreeProtos.Tree.Node childNode : node.getNodesList()) {
            traverseTreeAndFind(childNode);
        }
    }

    private void addNodesRecursively(TreeProtos.Tree.Node.Builder nodeBuilder, // where to append child
                                     TreeProtos.Tree.Node node, // from where get method and it's width
                                     int depth) {
        depth++;
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        nodeBuilder = updateNodeList(nodeBuilder, node);
        for (TreeProtos.Tree.Node childNode : node.getNodesList()) {
            addNodesRecursively(nodeBuilder, childNode, depth);
        }
    }

    private void initTreeBuilder() {
        TreeProtos.Tree.Node.Builder baseNode = TreeProtos.Tree.Node.newBuilder()
                .addNodes(TreeProtos.Tree.Node.newBuilder()
                        .setNodeInfo(
                                createNodeInfo(
                                        className,
                                        methodName,
                                        desc,
                                        isStatic,
                                        0
                                )
                        ));
        wantedMethodNode = baseNode.getNodesBuilder(0);
        treeBuilder = TreeProtos.Tree.newBuilder()
                .setBaseNode(baseNode);
    }
}