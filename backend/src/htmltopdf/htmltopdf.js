const nodemailer = require("nodemailer");
const path = require("path");
const Handlebars = require("handlebars");
const pdf = require("html-pdf");
const fs = require("fs");

const parentPath = path.join(__dirname, "../..");
const fileDir = path.join(parentPath, "/src/uploads/invoice"); // tempat file (foto, html, pdf)
// const pdfName = `result${Date.now()}.pdf`
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "rochafi.dev@gmail.com",
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN
//   }
// });

const createPdf = async (products, pdfName) => {
  var subTotal = 0;
  var product = products.map(obj => {
    subTotal += obj.priceProduct
    return (
      `<tr>
        <td>${obj.product_id}</td>
        <td>${obj.product_name}</td>
        <td>${obj.category1}'s ${obj.category2}</td>
        <td>${obj.size}</td>
        <td>${obj.qty}</td>
        <td>Rp${(obj.priceProduct).toLocaleString("IN")}</td>
        <td>${obj.created_at.getDate()}-${obj.created_at.getMonth()}-${obj.created_at.getFullYear()}</td>
        <td>Rp${(obj.qty * obj.priceProduct).toLocaleString("IN")}</td>
      </tr>`)
  })

  var source = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>A simple, clean, and responsive HTML invoice template</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossorigin="anonymous"
      />
      <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"
      ></script>
      <style>
        .brand {
          font-size: 50px;
        }
      </style>
      </head>
      
      <body>
      <!------ Include the above in your HEAD tag ---------->
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body p-0">
                <div class="row px-5 my-1">
                  <div class="col-md-6">
                    <i class="fas fa-shoe-prints fa-3x"></i>
                    <p class="brand d-inline">Brand<b>Name</b></p>
                  </div>
  
                  <div class="col-md-6 text-right my-2">
                    <p class="font-weight-bold mb-1">Invoice #{{invoiceNumber}}</p>
                    <p class="text-muted">Due to: {{dueTo}}</p>
                  </div>
                </div>
  
                <hr class="my-2" />

                <div class="row px-5">
                  <div class="col-md-6">
                    <p class="font-weight-bold mb-4">Customer Information</p>
                    <p class="mb-1">{{name}}</p>
                    <p>{{address}}</p>
                    <p class="mb-1">{{city}}, {{province}}</p>
                    <p class="mb-1">{{posCode}}</p>
                  </div>
                  <div class="col-md-6">
                    <p class="font-weight-bold mb-4">Shipping Estimation</p>
                    <p class="mb-1">Rp{{priceShipment}}</p>
                  </div>
                </div>
  
                <div class="row py-2 px-5">
                  <div class="col-md-12">
                    <table class="table">
                      <thead>
                        <tr>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            ID
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Item
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Category
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Size
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Quantity
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Unit Cost
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Date
                          </th>
                          <th
                            class="border-0 text-uppercase small font-weight-bold"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      ${product.join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
  
                <div class="d-flex flex-row-reverse bg-dark text-white px-5 py-0">
                  <div class="py-3 px-5 text-right d-inline">
                    <div class="mb-2">Grand Total</div>
                    <div class="h4 font-weight-light">Rp{{priceGrand}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="text-light mt-5 mb-5 text-center small">
          by :
          <a class="text-light" target="_blank" href="http://totoprayogo.com"
            >totoprayogo.com</a
          >
        </div>
      </div>
    </body>
  </html>
  
`;

  var data = {
    invoiceNumber: `${products[0].order_id}`,
    dueTo: `${products[0].updated_at.getDate()}-${products[0].updated_at.getMonth()}-${products[0].updated_at.getFullYear()}`,
    name: `${products[0].first_name} ${products[0].last_name}`,
    address: `${products[0].address1}`,
    city: `${products[0].city}`,
    province: `${products[0].province}`,
    posCode: `${products[0].pos_code}`,
    subTotal: (subTotal).toLocaleString("IN"),
    priceShipment: `${(products[0].priceShipment).toLocaleString("IN")}`,
    priceGrand: `${(products[0].priceGrand).toLocaleString("IN")}`

    // table: products
  };

  var template = Handlebars.compile(source); // compile teks html
  var result = template(data); // gabungkan object data dg template html

  fs.writeFileSync(`${fileDir}/result.html`, result); // path, template

  var htmls = fs.readFileSync(`${fileDir}/result.html`, "utf8");

  var options = {
    "height": "928px",
    "width": "1451px"
  };



  await pdf
    .create(htmls, options)
    .toFile(`${fileDir}/${pdfName}`, (err, result) => {
      if (err) return console.log(err.message);
      // console.log(result);
      console.log(pdfName);

      return pdfName;
      // fnSendEmail();
    });

};

module.exports = { createPdf };
