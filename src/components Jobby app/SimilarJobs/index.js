import {TiShoppingBag} from 'react-icons/ti'
import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsDetails

  return (
    <li>
      <div className="similar-items-bg">
        <div className="similar-img-title">
          <img
            className="similar-img"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-title-img-con">
            <h3>{title}</h3>
            <div className="rating-container">
              <AiFillStar className="rating-star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h4>Description</h4>
        <p>{jobDescription}</p>
        <div className="location-type-container">
          <div className="location-container">
            <GoLocation className="react-icon-location" />
            <p>{location}</p>
          </div>
          <div className="type-container">
            <TiShoppingBag className="react-icon-type" />
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
