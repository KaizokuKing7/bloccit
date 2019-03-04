const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const sequelize = require("../../src/db/models/index").sequelize;

describe("Topic", () => {
    beforeEach((done) => {
        //#1
        this.topic;
        this.post;
        sequelize.sync({ force: true }).then((res) => {

            //#2
            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
            })
                .then((topic) => {
                    this.topic = topic;
                    //#3
                    Post.create({
                        title: "My first visit to Proxima Centauri b",
                        body: "I saw some rocks.",
                        //#4
                        topicId: this.topic.id
                    })
                        .then((post) => {
                            this.post = post;
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

    });
    describe("#create()", () => {
        it("Should create a topic", (done) => {
            Topic.create({
                title: "News",
                description: "Weather at eleven"
            })
                .then((topic) => {
                    expect(topic.title).toBe("News")
                    expect(topic.description).toBe("Weather at eleven")
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

    });


    describe("#getPosts()", () => {
        it("Should return the associated posts", (done) => {
            this.topic.getPosts()
                .then((posts) => {
                    expect(posts[0].title).toBe("My first visit to Proxima Centauri b")
                    done();
                })

        });
    })
})