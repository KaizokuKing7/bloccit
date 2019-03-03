const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;


describe("routes : advertisement", () => {
    beforeEach((done) => {
        this.advert;
        sequelize.sync({ force: true }).then((res) => {
    
            Advertisement.create({
            title: "store",
            description: "new deals here"
          })
            .then((advert) => {
              this.advert = advert;
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
    
        });
    
      });
    describe("Get /advertisments", () => {
        it("Should return 200 and a ad in the body", (done) =>{
            request.get(base,(err,res,body) =>{
                expect(res.statusCode).toBe(200);
                expect(body).toContain("store");
        expect(body).toContain("new deals here");
                done();
            });
        });
    })

    describe("Get /advertisements/new", () => {
        if("Should return a form to create a new ad", (done) => {
            request.get(`${base}new`,(err,res,body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toHaveClass("form");
                done();
            })
        });
    })



})