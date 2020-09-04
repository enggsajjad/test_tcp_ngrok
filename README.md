# test_tcp_ngrok
Creating a TCP tunning, server and client etc.

## Example

### Goto to H:/github/test_tcp_ngrok/test6/server and open a Terminal here:

Type node index.js, this will open a terminal which shows that server is running and waiting for TCP data.

This will open a Terminal and whenever there is a data is reveived, it is shown here.


H:\github\test_tcp_ngrok\tcptest6>node index.js

TCP Server is running on port 8080.

CONNECTED: 127.0.0.1:50126

DATA 127.0.0.1: { scooterId: 'C45ZA1', pm25: 234, pm10: 110 }

DATA 127.0.0.1: { scooterId: 'C45ZA1', pm25: 234, pm10: 110 }




### Then open Terminal in C:/ and type "ngrok.exe tcp 8080". 


ngrok by @inconshreveable    (Ctrl+C to quit)

Session Status                online

Account                       Sajjad Hussain (Plan: Free)

Version                       2.3.35

Region                        United States (us)

Web Interface                 http://127.0.0.1:4040

Forwarding                    tcp://0.tcp.ngrok.io:15339 -> localhost:8080


Connections                   ttl     opn     rt1     rt5     p50     p90

							  337     0       0.00    0.00    24.74   299.99

This indicates the TCP address:0.tcp.ngrok.io and TCP Port:15339 to be used in the ARdiuno.


