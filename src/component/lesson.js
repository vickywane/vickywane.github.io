import Courses from "../data/lessons.json" assert { type: "json" };

new Vue({
  el: "#vue-app-container",
  data: {
    defaultSort: "subject",
    sortDirection: "asc",
    searchQuery: "",
    lessons: Courses,
    courseCartModalVisibility: false,
    modalView: "CHECKOUT_ITEMS", // ITEMS_PAYMENT /OR/ CHECKOUT_ITEMS
    
    sortField: "",
    sortOrder: "ascending",
    checkoutInfo: {},
    course_cart: [],
  },
  methods: {
    sortLessons: function name(sortBy) {},
    addCourseToCart: function (lessonId) {
      const course = this.lessons.courses.find((item) => item.id === lessonId);

      this.course_cart.push(course);
    },
    canAddToCart: function (lesson) {},
    removeCourseFromCart(lessonId) {},

    setCourseCartModalVisibility: function (visibility) {
      this.courseCartModalVisibility = visibility;
    },
    setModalView: function (view) {
      this.modalView = view
    },
    sortAscending: function (field) {
      this.lessons.courses.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }

        if (b[field] > a[field]) {
          return 1;
        }
      });
    },
    sortDescending: function (field) {
      this.lessons.courses.sort((a, b) => {
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
    console.log("Vue App Is Loaded!");

    this.sortAscending("price");
  },
  computed: {
    totalCartPrice() {
      return this.course_cart.reduce(
        (acc, newVal) => ({ price: acc.price + newVal.price }),
        { price: 0 }
      );
    },
  },
  watch: {
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
