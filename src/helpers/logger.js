import pino from 'pino';
import pinoPretty from 'pino-pretty';
// import callsites from 'callsites';

// const getCallerDetails = () => {
//   const stack = callsites(); //get stack trace
//   const frame = stack[1]; // probable caller of the logger
//   const filename = frame.getFileName() || 'unknownFile';
//   const methodName = frame.getFunctionName() || 'unknownMethod';

//   return { filename, methodName};
// };

export const logger = pino({
  base: {
    // moduleName: getCallerDetails().filename,
    // methodName: getCallerDetails().methodName
  },
}, pinoPretty({
  colorize: true,
  translateTime: "yyyy-mm-dd HH:MM:ss",
}));


//We have diferrent kind of logs, for example, we have logs for request_info,fatal, error, warn, info, debug, and trace.
//We have a custom level called request_info that we use for request information.
//We have a custom color for request_info logs.
//We have a transport configuration that uses the pino-pretty module to format the logs.
//We have a logger instance that uses the pino module.
//We export the logger instance.
//We import the logger instance in other files to use it.

//How to create a custom logger with Pino
//Pino allows us to create a custom logger with custom levels, custom colors, and custom transports.
//To create a custom logger with Pino, we need to create a custom logger instance with the pino module.

// We had the name of the custom level and the value of the custom level.
/*
export const logger = pino({
  customLevels: {
    <name>: #,
  },
  transport,
});
*/
 
