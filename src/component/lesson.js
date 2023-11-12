import lessons from "../data/lessons.js";

const regexMatcher = (regex, text) => {
  return text.match(text);
};

new Vue({
  el: "#vue-app-container",
  data: {
    lessons,
    courseCartModalVisibility: false,
    appView: "SELECT_ITEMS", // ITEMS_PAYMENT /OR/ CHECKOUT_ITEMS /OR/ CHECKOUT_COMPLETE

    customerName: "",
    customerPhoneNumber: "",

    searchText: "",
    sortField: "",
    sortOrder: "ascending",
    checkoutInfo: {},
    course_cart: [{}],
  },
  methods: {
    validateNameKeyPress: function (event) {
      if (!/^[A-Za-z]+$/.test(event.key)) {
        return event.preventDefault();
      }
    },
    validatePhoneNumberKeyPress: function (event) {
      if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
        return event.preventDefault();
      }
    },
    addCourseToCart: function (lessonId) {
      const course = this.lessons.find((item) => item.id === lessonId);

      // confirm that the course isnt already in cart

      this.lessons = this.lessons.map((item) => {
        if (item.id === lessonId) {
          return { ...item, spaces: item.spaces - 1 };
        }

        return item;
      });

      this.course_cart.push(course);
    },
    removeCourseFromCart(lessonId) {
      const courseInCart = this.course_cart.find(
        (course) => course.id === lessonId
      );

      // extra check to confirm course is in cart before filtering out
      if (courseInCart) {
        this.course_cart = this.course_cart.filter(
          (item) => item?.id !== courseInCart?.id
        );

        this.lessons = this.lessons.map((item) => {
          if (item.id === lessonId) {
            return { ...item, spaces: item.spaces + 1 };
          }

          return item;
        });

        // close checkout if last item is removed
        if (this.course_cart.length <= 0) {
          this.setCourseCartModalVisibility(false);
        }
      }
    },
    setCourseCartModalVisibility: function (visibility) {
      this.courseCartModalVisibility = visibility;
    },
    setappView: function (view) {
      if (view === "CHECKOUT_COMPLETE") {
        // reset cart
        this.course_cart = [];
      }

      this.appView = view;
    },
    sortAscending: function (field) {
      this.lessons.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }

        if (b[field] > a[field]) {
          return 1;
        }
      });
    },
    sortDescending: function (field) {
      this.lessons.sort((a, b) => {
        if (a[field] > b[field]) {
          return -1;
        }

        if (b[field] < a[field]) {
          return 1;
        }
      });
    },
  },
  mounted() {
    console.log();

    // this.sortAscending("price");
  },
  computed: {
    hasEnoughInfoToCheckout() {
      return (
        /^[A-Za-z]+$/.test(this.customerName) &&
        /^[0-9]+$/.test(this.customerPhoneNumber)
      );
    },
    totalCartPrice() {
      return this.course_cart.reduce(
        (acc, newVal) => ({ price: acc.price + newVal.price }),
        { price: 0 }
      );
    },
  },
  watch: {
    searchText: function (newVal) {
      /*
          This is my attempt to implement a fuzzy search type that finds 
          search items using their characters.

          My approach is to interpolate all attributes together in a single
          string & leverage the .includes method to see if the search string exists in the lesson object. 
          ( This may not be a very good approach performance-wise... but it works 🫣 ) 
      */

      this.lessons = lessons.filter(({ subject, price, location }) =>
        `${subject.toLowerCase()} ${price} $${price} ${location.toLowerCase()}`.includes(
          newVal.toLowerCase()
        )
      );
    },
    sortField: function (newVal) {
      if (this.sortOrder === "ascending") {
        this.sortAscending(newVal);
        return;
      }

      this.sortDescending(newVal);
    },
    sortOrder: function (newVal) {
      /*
        watcher sortOrder method uses `price` field by default to sort results 
      */
      if (newVal === "ascending") {
        this.sortAscending("price");
        return;
      }

      this.sortDescending("price");
    },
  },
});
