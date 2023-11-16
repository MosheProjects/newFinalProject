import shlomoProfile from "../images/shlomo-profile-pic.jpeg"
import mosheProfile from "../images/moshe-profile-pic.jpeg"

export default function AboutUs() {
  return (
    <div dir="rtl" className="bg-light-indigo d-flex flex-column align-items-center justify-content-center">
      <div className="container text-center mx-2 mt-2 fs-4 p-5">
        הקמנו את האתר מכיוון ששנינו הורים לילדים קטנים ושמנו לב שהרבה פעמים אנחנו שומעים על כמה שהילד לא מתפתח מספיק מכל מיני אנשים לא מוסמכים וחשבנו שיהיה נחמד אם תהיה אפשרות נגישה לקבל מידע מהימן על התפתחות ילדינו
      </div>
      <div className="container d-flex flex-md-row flex-column align-items-center justify-content-evenly mb-2 ">
        <div class="col-md-4 col-10 card text-center  mb-3 m-md-0">
          <img class="card-img-top" src={shlomoProfile} alt="" />
          <div class="card-body">
            <p class="card-text fs-2 fw-bold">שלמה סלומון</p>
            <p class="card-text d-block">Big description</p>
          </div>
        </div>
        <div class="col-md-4 col-10 card text-center">
          <img class="card-img-top" src={mosheProfile} alt="" />
          <div class="card-body">
            <p class="card-text fs-2 fw-bold">משה דיימונד</p>
            <p class="card-text d-block">Big description</p>
          </div>
        </div>
      </div>
    </div>
  )
}
