import {grpc} from "@improbable-eng/grpc-web"
// import {NodeHttpTransport} from "@improbable-eng/grpc-web-node-http-transport"
import {ReactNativeTransport} from "@improbable-eng/grpc-web-react-native-transport"

// https://github.com/improbable-eng/grpc-web/issues/592
grpc.setDefaultTransport(ReactNativeTransport({}))

export async function unary(host, method, request) {
  return new Promise((resolve, reject) => {
    grpc.unary(method, {
      request: request,
      host: host,
      onEnd: ({status, statusMessage, message}) => {
        if (status === grpc.Code.OK) {
          resolve(message)
        } else {
          reject(new Error(statusMessage))
        }
      },
    })
  })
}
