import { InfluxDBClient } from "@influxdata/influxdb3-client";
import { success } from "./utils/resposneWrapper";

const dbConnect = async () => {
  try {
    const client = new InfluxDBClient({
      host: "https://us-east-1-1.aws.cloud2.influxdata.com",
      org: "Intern",
      bucket: "Containerz",
      token:
        "0YgGlzDbSvAk3izAfNAzF6ukH7ymN0e6s1cQwJ6AY8AlHJq4rQ3XuqO8ta2Xc0ZXRgfcuz3cc2X8K0puLuZ7Hw==",
    });
    const result = await client.ping(2000);
    console.log(result);
  } catch (error) {
    console.log(error);
    return res.send(success(500, "Internal Server Error"));
  }
};
