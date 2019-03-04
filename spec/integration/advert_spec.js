const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : ads", () => {
        beforeEach((done) => {
        this.advert;
        sequelize.sync({ force: true }).then((res) => {
            Advertisement.create({
                title: "store",
                description: "best deals"
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
    describe("GET /advertisements", () => {

        it("should return a status code 200 and all advertisements", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Advertisements");
                expect(body).toContain("store");
                done();
            });
        });
    });
    describe("GET /advertisements/new", () => {

        it("should render a new advertisement form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
            });
        });

    });
    describe("POST /advertisements/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "Store",
                description: "best deals"
            }
        };

        it("should create a new advertisement and redirect", (done) => {

            //#1
            request.post(options,

                //#2
                (err, res, body) => {
                    Advertisement.findOne({ where: { title: "store" } })
                        .then((advert) => {
                            expect(res.statusCode).toBe(303);
                            expect(advert.title).toBe("store");
                            expect(advert.description).toBe("best deals");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
    });

    describe("GET /advertisements/:id", () => {

        it("should render a view with the selected advertisement", (done) => {
            request.get(`${base}${this.advert.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("best deals");
                done();
            });
        });
        describe("POST /advertisements/:id/destroy", () => {

            it("should delete the advertisement with the associated ID", (done) => {

                //#1
                Advertisement.all()
                    .then((adverts) => {

                        //#2
                        const advertCountBeforeDelete = adverts.length;

                        expect(advertCountBeforeDelete).toBe(1);

                        //#3
                        request.post(`${base}${this.advert.id}/destroy`, (err, res, body) => {
                            Advertisement.all()
                                .then((adverts) => {
                                    expect(err).toBeNull();
                                    expect(adverts.length).toBe(advertCountBeforeDelete - 1);
                                    done();
                                })

                        });
                    });

            });

        });
        describe("GET /advertisements/:id/edit", () => {

            it("should render a view with an edit advertisement form", (done) => {
                request.get(`${base}${this.advert.id}/edit`, (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("Edit Advertisement");
                    expect(body).toContain("best deals");
                    done();
                });
            });

        });
        describe("POST /advertisements/:id/update", () => {

            it("should update the advertisement with the given values", (done) => {
                const options = {
                    url: `${base}${this.advert.id}/update`,
                    form: {
                        title: "store",
                        description: "best deals"
                    }
                };
                //#1
                request.post(options,
                    (err, res, body) => {

                        expect(err).toBeNull();
                        //#2
                        Advertisement.findOne({
                            where: { id: this.advert.id }
                        })
                            .then((advert) => {
                                expect(advert.title).toBe("store");
                                done();
                            });
                    });
            });

        });

    });
});
