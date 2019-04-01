package com.github.korniloval.flameviewer.handlers.tree.request.trees

import com.github.korniloval.flameviewer.ProfilerHttpRequestHandler.getParameter
import com.github.korniloval.flameviewer.ProfilerHttpRequestHandler.sendProto
import com.github.korniloval.flameviewer.TreeManager
import com.github.korniloval.flameviewer.handlers.tree.request.RequestHandler
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.http.QueryStringDecoder
import java.io.File
import java.util.*

class CallTreeRequestHandler(urlDecoder: QueryStringDecoder,
                             context: ChannelHandlerContext,
                             private val treeManager: TreeManager) : RequestHandler(urlDecoder, context) {
    override fun doProcess(logFile: File) {
        val trees = treeManager.getCallTree(logFile, filter, getThreadsIds(urlDecoder))
        sendProto(context, trees)
    }

    private fun getThreadsIds(urlDecoder: QueryStringDecoder): List<Int>? {
        if (getParameter(urlDecoder, "threads") == null) {
            return null
        }
        val threadsIds = ArrayList<Int>()
        val parameters = urlDecoder.parameters()["threads"] ?: return ArrayList()
        for (threadId in parameters) {
            threadsIds.add(Integer.parseInt(threadId))
        }
        return threadsIds
    }
}
