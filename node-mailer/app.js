const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(data, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,//587,
    secure: true, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"ContratService" <contratservicestafim@gmail.com>', // sender address
    to: "beya.bendkhill@stafim.tn", // list of receivers
    subject: "Contrat Service", // Subject line
    html: "<html>\n\
    <body>\n\
    <table>\n\
    <tr>\n\
    <td><h3>Nom:</h3> </td>" + data.nom + "<td></td>\n\
    </tr>\n\
    <tr>\n\
    <td><h3>Prenom:</h3> </td><td>" + data.prenom + "</td>\n\
    </tr>\n\
    <tr>\n\
    <td><h3>Telephone:</h3> </td>" + data.tel + "<td></td>\n\
    </tr>\n\
    <tr>\n\
    <td><h3>Email:</h3> </td><td>" + data.email + "</td>\n\
    </tr>\n\
    <tr>\n\
    <td><h3>Matricule:</h3> </td><td>" + data.matricule + "</td>\n\
    </tr>\n\
    <tr>\n\
    <td><h3>Contrat: Peugeot </h3> </td>" +data.modelev+" "+ data.type+" "+data.dureeGarantie+"Mois "+data.km+"Km "+data.puht+" PHT "+data.puttc+" PTTC" + "<td></td>\n\
    </tr>\n\
    </table></body></html>"
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);