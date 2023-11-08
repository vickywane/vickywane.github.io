import Courses from '../data/lessons.json'  assert { type: "json" };

let courseStore = new Vue({
  el: "#vue-app-container",
  data: {
    testMessage: "I AM HERE IN A DIFF FILE",

    defaultSort: "subject",
    sortDirection: "asc",
    searchQuery: "",
    lessons: Courses,
    checkoutInfo: {
      
    },
    course_cart: [],
  },
  methods: {
    addCourseToCart: function (lessonId) {
      const course = this.lessons.courses.find((item) => item.id === lessonId)

      this.course_cart.push(course)

      // console.log("I AM CLICKED =>", lessonId, course)
    },
    canAddToCart: function (lesson) {},
    removeCourseFromCart(lessonId) {},
  },
  mounted( ) {
    console.log("VUE IS MOUNTED!")
  },
  computed: {
    searchLessons() {},
  },
});
