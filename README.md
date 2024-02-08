# Influx DB

#### InfluxDB is a time series database designed to handle high write and query loads. It is an integral component of the TICK stack. InfluxDB is meant to be used as a backing store for any use case involving large amounts of timestamped data, including DevOps monitoring, application metrics, IoT sensor data, and real-time analytics.

## Influx DB Cloud

#### InfluxDB Cloud is a fully managed, serverless time series platform that enables you to build and deploy your time series use case in minutes. InfluxDB Cloud is built on top of the InfluxDB 2.0 platform and provides a 99.999% SLA, unlimited usage, and a pay-as-you-go pricing model.

## Setting up

- Create a new user account in `https://cloud2.influxdata.com/signup`

- After creating the account, you will be redirected to the InfluxDB Cloud UI. Click on the `Data` tab in the left-hand navigation bar and then click on the `Buckets` tab.

- Click on the `Create Bucket` button to create a new bucket. A bucket is a collection of time series data. You can think of a bucket as a database in a relational database management system (RDBMS).

- After creating the bucket, click on the `Tokens` tab in the left-hand navigation bar and then click on the `Generate` button to create a new token. A token is used to authenticate and authorize access to the InfluxDB Cloud API.

- After creating the token, click on the `Load Data` tab in the left-hand navigation bar and then click on the `Client Libraries` tab. You will see a list of client libraries that you can use to write data to InfluxDB Cloud.

- Click on the `Go` button to generate a code snippet that you can use to write data to InfluxDB Cloud. You can use the code snippet to write data to InfluxDB Cloud from your application.

### Using node js to connect Influx DB
- Install the influx package using npm.
- Import the Influx module in your Node.js application.
- Create an instance of the Influx.InfluxDB class, passing in the necessary configuration options.
- Use the instance to interact with your InfluxDB database.


```// Step 1: Install the influx package
// Run this command in your terminal
// npm install influx

// Step 2: Import the Influx module
const Influx = require('influx');

// Step 3: Create an instance of the InfluxDB class
const influx = new Influx.InfluxDB({
 host: 'localhost',
 database: 'mydb',
 schema: [
     {
         measurement: 'response_times',
         fields: {
             path: Influx.FieldType.STRING,
             duration: Influx.FieldType.INTEGER
         },
         tags: [
             'host'
         ]
     }
 ]
});

// Step 4: Use the instance to interact with your InfluxDB database
// For example, to write some data:
influx.writePoints([
    {
        measurement: 'response_times',
        tags: { host: 'localhost' },
        fields: { duration: 32, path: '/index.html' },
    }
]).catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
});
```

### Point:
- A point is a single data record in InfluxDB.
- It is composed of a measurement, tags, fields, and a timestamp. 
- A point represents a single data record in a time series.

### Measurement:
- A measurement is a collection of points that share the same measurement name, tag set, and retention policy.
- It is similar to a table in a relational database management system (RDBMS).

### Tag:
- A tag is a key-value pair that is associated with a point.
- They are indexed and can be used to filter and group data.

### Field:
- A field is a key-value pair that is associated with a point.
- They are not indexed and cannot be used to filter or group data.
