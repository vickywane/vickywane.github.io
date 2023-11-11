import Courses from "../data/lessons.json" assert { type: "json" };

new Vue({
  el: "#vue-app-container",
  data: {
    testMessage: "I AM HERE IN A DIFF FILE",

    defaultSort: "subject",
    sortDirection: "asc",
    searchQuery: "",
    lessons: Courses,

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


    sortAscending: function (field) {
      this.lessons.courses.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1
        }
        
        if (b[field] > a[field]) {
          return 1
        }
      })
    },
    sortDescending: function (field) {
      this.lessons.courses.sort((a, b) => {
        if (a[field] > b[field]) {
          return -1
        }
        
        if (b[field] < a[field]) {
          return 1
        }
      })
    }
  },
  mounted() {
    console.log("Vue App Is Fired!")

    this.sortAscending("price")
  },
  computed: {
    searchLessons() {},
  },
  watch: {
    sortField: function (newVal) {
      if (this.sortOrder === "ascending") {
        this.sortAscending(newVal)
        return 
      }

      this.sortDescending(newVal)
    },
    sortOrder: function (newVal) {
      /*
        watcher sortOrder method uses `price` field by default to sort results 
      */
      if (newVal === "ascending") {
        this.sortAscending("price")
        return 
      }

      this.sortDescending("price")
    },
  },
});
