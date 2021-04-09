const mqtt = require('mqtt');

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
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

}

module.exports = MqttHandler;