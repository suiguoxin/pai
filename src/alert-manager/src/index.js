// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Implementation of Alert Handler.
 * Init and start server instance.
 */

const express = require('express');
const unirest = require('unirest');
const bearerToken = require('express-bearer-token');
const nodemailer = require("nodemailer");
const Email = require('email-templates');

const app = express();

app.use(express.json());
app.use(bearerToken());

app.post('/alert-handler/stop-job', (req, res) => {
  console.log('alert-handler received `stop-job` post request from alert-manager.');

  // extract jobs to kill
  const jobNames = [];
  req.body.alerts.forEach(function (alert) {
    if (alert.status === 'firing') {
      jobNames.push(alert.labels.job_name);
    }
  });
  console.log(`alert-handler will stop these jobs: ${jobNames}`);

  const url = process.env.REST_SERVER_URI;
  const token = req.token;
  // stop job by sending put request to rest server
  jobNames.forEach(function (jobName) {
    unirest
      .put(`${url}/api/v2/jobs/${jobName}/executionType`)
      .headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })
      .send(JSON.stringify({ value: 'STOP' }))
      .end(function (res) {
        console.log(res.raw_body);
      });
  });

  res.status(200).json({
    message: 'alert-handler successfully send stop-job request to rest-server.',
  });
});

app.post('/alert-handler/send-email', (req, res) => {
  console.log('alert-handler received `send-email` post request from alert-manager.');

  console.log("alerts:", req.body.alerts);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_CONFIGS_SMTP_URL.split(":")[0],
    port: process.env.EMAIL_CONFIGS_SMTP_URL.split(":")[1],
    secure: false,
    auth: {
      user: process.env.EMAIL_CONFIGS_SMTP_AUTH_USERNAME,
      pass: process.env.EMAIL_CONFIGS_SMTP_AUTH_PASSWORD,
    },
  });

  const email = new Email({
    message: {
      from: EMAIL_CONFIGS_SMTP_FROM
    },
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'mars',
      message: {
        to: process.env.EMAIL_CONFIGS_RECEIVER,
        subject: "test-subject",
      },
      locals: {
        name: 'Elon'
      }
    })
    .then(console.log)
    .catch(console.error);

  res.status(200).json({
    message: 'alert-handler successfully',
  });
});

const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`alert-handler listening at http://localhost:${port}`);
});
