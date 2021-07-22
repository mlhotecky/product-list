import { createServer, Model } from "miragejs";

export function makeServer() {
  createServer({
    models: {
      product: Model,
    },
    seeds(server) {
      server.create("product", {
        name: "Product 1",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut tempus purus at lorem. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Duis pulvinar. In dapibus augue non sapien. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        img: "https://picsum.photos/200/300",
        features: ["feature1", "feature2", "feature3"],
        quantity: 3,
        period: 3,
        price: 2500,
      });

      server.create("product", {
        name: "Product 2",
        description:
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Integer malesuada.",
        img: "https://picsum.photos/200/300",
        features: ["feature1", "feature2", "feature3"],
        quantity: 7,
        period: 6,
        price: 3330,
      });
    },

    routes() {
      this.namespace = "api/products";

      this.get(
        "/",
        (schema) => {
          return schema.products.all();
        },
        { timing: 1000 }
      );

      this.patch("/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let note = schema.products.find(id);
        return note.update(newAttrs);
      });
    },
  });
}
