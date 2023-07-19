import {Link} from 'react-router-dom'
import {TiShoppingBag} from 'react-icons/ti'
import {GoLocation} from 'react-icons/go'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobListItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li>
        <div className="job-item-bg">
          <div className="similar-img-title">
            <img
              className="similar-img"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="similar-title-img-con">
              <h3>{title}</h3>
              <div className="rating-container">
                <AiFillStar className="rating-star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-con">
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
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h4>Description</h4>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobListItem
