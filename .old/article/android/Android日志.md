# Android 日志

日志包括 ERROR、WARN、INFO、DEBUG、VERBOSE。

ERROR、WARN、INFO的日志会始终保留在发行版中，如果想从用户设备上捕获消息来诊断问题的话可以使用这些日志。

各类日志都使用`Log.x(TAG:String,message:String)`的格式来调用，不过不要忘记`import android.util.Log`，一般使用类名作为TAG。

* ERROR-用于记录明显的错误
* WARN-用于不会使应用出现错误或者崩溃但是仍然值得注意的内容，比如媒体应用可能会记录磁盘空间的不足
* INFO-用于一些单纯的消息，比如应用连接到了互联网
* DEBUG-只用于调试，经常用于记录向服务器发起请求的相关信息