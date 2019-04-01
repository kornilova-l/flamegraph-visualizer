package com.github.korniloval.flameviewer.handlers.tree.request.json

import com.github.korniloval.flameviewer.ProfilerHttpRequestHandler.getParameter
import com.github.korniloval.flameviewer.TreeManager
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.http.QueryStringDecoder
import java.io.File

class HotSpotsRequestHandler(urlDecoder: QueryStringDecoder,
                             context: ChannelHandlerContext,
                             private val treeManager: TreeManager) : JsonRequestHandler(urlDecoder, context) {

    override fun getJsonObject(logFile: File): Any? {
        val projectName = getParameter(urlDecoder, "project")
        val fileName = getParameter(urlDecoder, "file")
        if (projectName == null || fileName == null) {
            return null
        }
        return treeManager.getHotSpots(logFile)
    }
}
