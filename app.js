const root = document.querySelector("#root");

class App extends React.Component {
  constructor() {
   // console.log("constructor is called ==");
    super();
    this.state = {
      products: [],
      companies: [],
    };
  }

  componentDidMount() {
   // console.log("componentDidMount called !!!! ");
    Promise.all([
      axios.get("https://acme-users-api-rev.herokuapp.com/api/products"),
      axios.get("https://acme-users-api-rev.herokuapp.com/api/companies"),
    ]).then((values) => {
     // console.log(values);
      //console.log(values[0].data);
      //console.log(values[1]);
      this.setState({ products: values[0].data, companies: values[1].data });
    });

  //  console.log(this.state);
  }

  render() {
    // console.log("render is called now ~~ ");
    // console.log(this.state);
     const { products, companies } = this.state;

    if (companies.length && products.length) {
     // console.log("inside data available ==");
      const header = React.createElement(Header, { companies, products });

      const productLi = React.createElement(
        "div",
        { className: "box" },
        React.createElement(ProductsList, { products })
      );
      const companyLi = React.createElement(
        "div",
        { className: "box" },
        React.createElement(CompaniesList, { companies })
      );

      return React.createElement("div", null, header, productLi, companyLi);
    }
    return "";
  }
}

class Header extends React.Component {
  render() {
    const { products, companies } = this.props;
    const header = React.createElement(
      "h1",
      null,
      `Acme-We have ${products.length} Products and ${companies.length} Companies`
    );
    return React.createElement("div", null, header);
  }
}

class CompaniesList extends React.Component {
  render() {
  //  console.log(this.props);
    const { companies } = this.props;
    //console.log({ companies });
    const lis = companies.map((company) =>
      React.createElement("li", { key: company.id }, company.name)
    );
    return React.createElement("ul", null, lis);
    // return companies.map((element, idx) => {
    //   return React.createElement("li", { key: idx }, element.name);
    // });
  }
}

class ProductsList extends React.Component {
  render() {
    const { products } = this.props;
    const lis = products.map((product) =>
      React.createElement("li", { key: product.id }, product.name)
    );
    return React.createElement("ul", null, lis);
    // return products.map((element, idx) => {
    //   return React.createElement("li", { key: idx }, element.name);
    // });
  }
}

ReactDOM.render(React.createElement(App), root, () => {
//  console.log("I have rendered");
});
