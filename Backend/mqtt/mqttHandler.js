var mqtt = require('mqtt');
var postgreClient = require('../postgreSQL/postgreHandler')

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'HOST';
    this.username = 'USER';
    this.password = 'PASSWORD';
  }
  
  connect() {
    
    this.mqttClient = mqtt.connect(this.host);

    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    this.mqttClient.subscribe(['esp32/dht/temperature','esp32/dht/humidity'], {qos: 0});


    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
      if(topic == 'esp32/dht/temperature'){
        console.log("mensaje de temperatura");
      }
      else{
          console.log("mensaje de humedad");
      }
      
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

}

module.exports = MqttHandler;