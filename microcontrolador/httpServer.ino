
boolean mismoSSID = false; // variable para seleccionar en la lista desplegable la red guardada en la 
                            //configuración si está disponible y en ese caso también mostrar la contraseña guardada

// Inicia el web server montado en la ESP8266 y configurar los manejadores de peticiones
int startWebServer(){
    server.on("/", HTTP_GET, handleRoot);        // Call the 'handleRoot' function when a client requests URI "/"
    server.on("/configure", HTTP_POST, handleConfigure); // Call the 'handleLogin' function when a POST request is made to URI "/login"
    server.on("/configure", HTTP_GET, handleConfigure); // Call the 'handleLogin' function when a GET request is made to URI "/login"
    server.onNotFound(handleNotFound);           // When a client requests an unknown URI (i.e. something other than "/"), call function "handleNotFound"
    server.begin();
    Serial.println("HTTP server started");
}

// Devuelve una página con la configuración actual y un botón para ir a la pagina de cambio de configuración

void handleRoot() {                       
    String response = "";
    response += "<!DOCTYPE html><html>";
    response += "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
    response += "<link rel=\"icon\" href=\"data:,\">";
    // CSS to style the buttons 
    response += "<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}";
    response += ".button { background-color: #195B6A; border: none; color: white; padding: 16px 40px;";
    response += "text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}";
    response += ".button {background-color: #77878A;}</style></head>";
    
    // Web Page Heading
    response += "<body><h1>Proyecto Centinela</h1>";
    response += "<h2>Configuracion actual</h2>";


    //configuracion actual
    response += "<table>";
    
    response += "<tr><td><a>Chip ID: </a></td><td><a>" + String(idSensor);
    response += "</a></td></tr><br>";
    response += "<tr><td><a>SSID Ap Internet: </a></td><td><a>" + String(inetSSID);
    Serial.println(String(WiFi.localIP()));
    response += (String(WiFi.localIP()) == "0")?" (Desconectado)":"(Conectado - " + WiFi.localIP().toString() + ")";
    response += "</a></td></tr><br>";
    response += "<tr><td><a>Contrase&ntilde;a AP de internet: </a></td><td><a>" + String(inetPass) + "</a></td></tr><br>";
    response += "<tr><td><a>Servidor de datos: </a></td><td><a>" + String(dataServer) + "</a></td></tr><br>";
    response += "<tr><td><a>SSID AP Sensor: </a></td><td><a>" + String(espSSID) + "</a></td></tr><br>";
    response += "<tr><td><a>Contrase&ntilde;a Sensor: </a></td><td><a>" + String(espPass) + "</a></td></tr><br>";
    response += "<tr><td><a>Intervalo mediciones (seg.): </a></td><td><a>" + String(period / 1000) + "</a></td></tr><br>";
    
    response += "</table>";

    response += "<form action=\"/configure\" method=\"get\"><input type=\"submit\" class=\"button\" value=\"configurar\"/></form>";
  
    server.send(200, "text/html", response);
    Serial.println(ESP.getFreeHeap());
}

// devuelve una página con un formulario para cambiar las configuraciones
void handleConfigure(){
    mismoSSID = false;
    boolean reconnectToWifi = false; //Si se cambia la configuración del access point de acceso a internet intentar conectar
    
    if (server.hasArg("inetSSID") and server.arg("inetSSID") != String(inetSSID)){
        server.arg("inetSSID").toCharArray(inetSSID, 32);
        writeInetSSID(String(inetSSID));
        reconnectToWifi = true;
    }
    if (server.hasArg("inetPass") and server.arg("inetPass") != String(inetPass)){
        server.arg("inetPass").toCharArray(inetPass, 32);
        writeInetPass(String(inetPass));
        reconnectToWifi = true;
    }
    if (server.hasArg("espSSID") and server.arg("espSSID") != String(espSSID)){
        server.arg("espSSID").toCharArray(espSSID, 32);
        writeEspSSID(String(espSSID));
    }
    if (server.hasArg("espPass") and server.arg("espPass") != String(espPass)){
        server.arg("espPass").toCharArray(espPass, 32);
        writeEspPass(String(espPass));
    }
    if (server.hasArg("dataServer") and server.arg("dataServer") != String(dataServer)){
        server.arg("dataServer").toCharArray(dataServer, 128);
        writeDataServer(String(dataServer));
    }

    if (reconnectToWifi == true){
        connectToWifi();
        reconnectToWifi = false;
    }

    
    String response = "";
    response += "<!DOCTYPE html><html>";
    response += "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">";
    response += "<link rel=\"icon\" href=\"data:,\">";
    // CSS to style the buttons 
    response += "<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}";
    response += ".button { background-color: #195B6A; border: none; color: white; padding: 16px 40px;";
    response += "text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}";
    response += ".button2 {background-color: #77878A;}</style></head>";
    
    // Web Page Heading
    response += "<body><h1>Proyecto Centinela</h1>";
    response += "<h2>Cambiar configuracion</h2>";
    //configuracion actual
    response += "<form action=\"/configure\" method=\"post\">";
    response += "<table>";
    response += "<tr><td><a>SSID AP Internet: </a></td><td><select name=\"inetSSID\">";
    response += scanNetworkss();
    response += "</select>";
    
    Serial.println(String(WiFi.localIP()));
    response += (String(WiFi.localIP()) == "0")?" (Desconectado)":" (Conectado - " + WiFi.localIP().toString() + ")";
    response += "</td></tr><br>";
    response += "<tr><td><a>Contrase&ntilde;a AP Internet: </a></td><td><input type=\"text\" name=\"inetPass\" value=\"";
    // Si el SSID guardado en la configuración es el mismo que el seleccionado mostrar la contraseña guardada
    if (mismoSSID){
        response += String(inetPass);
    }
    response += "\"/></td></tr><br>";
    response += "<tr><td><a>URL Servidor: </a></td><td><input type=\"text\" name=\"dataServer\" value=\""; 
    response += String(dataServer);
    response += "\"/></td></tr><br>";
    response += "<tr><td><a>SSID AP Sensor: </a></td><td><input type=\"text\" name=\"espSSID\" value=\"";
    response += String(espSSID);
    response += "\"/></td></tr><br>";
    response += "<tr><td><a>Contrase&ntilde;a AP Sensor: </a></td><td><input type=\"text\" name=\"espPass\" value=\"";
    response += String(espPass);
    response += "\"/></td></tr><br>";
    response += "<tr><td><a>Intervalo mediciones: </a></td><td><input type=\"text\" name=\"period\" value=\"";
    response += String(period / 1000);
    response += "\"/></td></tr><br></table>";
    response += "<input type=\"submit\" class=\"button\" value=\"guardar\">";
    response += "</form></body></html>";
        
    server.send(200, "text/html", response);
    Serial.println(ESP.getFreeHeap());
}

//Si se ingresa una url no encontrada redireccionar a la raiz
void handleNotFound(){
    server.sendHeader("Location","/");// Add a header to respond with a new location for the browser to go to the home page again
    server.send(303);  // Send it back to the browser with an HTTP status 303 (See Other) to redirect
//    server.send(404, "text/plain", "404: Not found"); // Send HTTP status 404 (Not Found) when there's no handler for the URI in the request
}

//Busca en las redes disponibles y las agrega a la lista desplegable de la página de configuración
String scanNetworkss(){
    Serial.println("scan start");
    String str = "";

    // WiFi.scanNetworks will return the number of networks found
    int n = WiFi.scanNetworks();
    Serial.println("scan done");
    if (n == 0) {
        Serial.println("no networks found");
        str += "No se encontraron redes";
    } else {
        Serial.print(n);
        Serial.println(" networks found");
        for (int i = 0; i < n; ++i) {
            // Print SSID and RSSI for each network found
            Serial.print(i + 1);
            str += "<option value=\"" + WiFi.SSID(i) +"\" ";
            if (WiFi.SSID(i) == String(inetSSID)){               //Si es la red guardada en la configuración seleccionarla
                str += "selected";
                mismoSSID = true;
            }
            str += ">" + WiFi.SSID(i) + "</option>";
          delay(10);
        }
    }
    Serial.println("");
    return str;
}


