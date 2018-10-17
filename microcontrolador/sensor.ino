
// Lee los datos del sensor
int readSensor(){
    byte comandos[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79}; //Comandos del sensor.
    byte respuesta[9]; // Respuesta del sensor.

    //vacio el buffer del SoftwareSerial co2UART por si quedo basura 
    while (co2UART.available()){
        co2UART.read();
    }
    
    Serial.println("Enviando solicitud de lectura.");
    co2UART.write(comandos, 9);
    
    // limpia el buffer de respuesta.
    memset(respuesta, 0, 9);
    /*
    while (co2UART.available() < 9) {
        delay(100);
        Serial.println("esperando respuesta...");
    }
    */
    delay(200);
    if (co2UART.available() > 0) {
        co2UART.readBytes(respuesta, 9);
        Serial.println("hay respuesta...");
        
    }
    // Imprimir respuesta (hexadecimal).
    for (int i = 0; i < 9; i++) {
        Serial.print(String(respuesta[i], HEX));
        Serial.print("   ");
    }
    Serial.println("");
    
    // checksum comprueva si hubo errores en la respuesta
    byte check = getCheckSum(respuesta);
    if (respuesta[8] != check) {
        Serial.println("CHECKSUM ERRONEO");
        Serial.print("Recibido: ");
        Serial.println(respuesta[8]);
        Serial.print("Deveria ser: ");
        Serial.println(check);
    }
    
    // ppm
    co2Value = 256 * (int)respuesta[2] + respuesta[3];
    Serial.println("------ UART ------ ");
    Serial.print("   PPM: ");
    Serial.println(co2Value);
    
    // Temperatura
    //tmpValue = (int)((respuesta[4] - 32)*5/9);
    tmpValue = (int)(respuesta[4] - 40);
    Serial.print("   Temperatura: ");
    Serial.println(String(tmpValue));
    
    return 1;
}
byte getCheckSum(byte *packet) {
    byte i;
    unsigned char checksum = 0;
    for (i = 1; i < 8; i++) {
        checksum += packet[i];
    }
    checksum = 0xff - checksum;
    checksum += 1;
    return checksum;
}



// Envía los datos al servidor de datos
int sendDataToServer(){
    if(WiFi.status()== WL_CONNECTED){   
 
        HTTPClient http;    
        
        http.begin(String(dataServer));      
        
        // para el sevidor de prueba en digitalOcean, pasado por post
        //http.addHeader("Content-Type", "application/x-www-form-urlencoded");
        //int httpCode = http.POST("idSensor=" + String(idSensor) + "&tmpValue=" + String(tmpValue) + "&co2Value=" + String(co2Value));


        //Para servidor tomcat linti, con post en formato json
        http.addHeader("Content-Type", "application/json");
        String json = "{\"dioxidoCarbono\": " + String(co2Value) + ", \"temperatura\": " + String(tmpValue) + ", \"dispositivo\":{\"idSensor\": 9}}";
        int httpCode = http.POST(json);
        Serial.println(json);
 

        //int httpCode = http.POST("idSensor=" + String(idSensor) + "&tmpValue=" + String(tmpValue) + "&co2Value=" + String(co2Value));
        String respuesta = http.getString();  
        
       Serial.println(httpCode);   
       Serial.println(respuesta);    
        
        http.end();  //Close connection

     }else{
 
       Serial.println("Error in WiFi connection");   
 
     }
}

