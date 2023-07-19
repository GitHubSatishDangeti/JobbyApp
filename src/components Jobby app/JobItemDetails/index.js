import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {TiShoppingBag} from 'react-icons/ti'
import {GoLocation} from 'react-icons/go'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiJobStats = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {jobItem: [], similarJobs: [], apiJobStatus: apiJobStats.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiJobStatus: apiJobStats.loading})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatJobDetails = [data.job_details].map(i => ({
        companyLogoUrl: i.company_logo_url,
        companyWebsiteUrl: i.company_website_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        lifeAtCompany: {
          description: i.life_at_company.description,
          imageUrl: i.life_at_company.image_url,
        },

        location: i.location,
        packagePerAnnum: i.package_per_annum,
        rating: i.rating,

        skills: i.skills.map(k => ({
          imageUrl: k.image_url,
          name: k.name,
        })),
        title: i.title,
      }))
      console.log(formatJobDetails)
      const formatSimilarJobs = data.similar_jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        rating: i.rating,
        title: i.title,
      }))
      // console.log(formatSimilarJobs)
      console.log(formatJobDetails.skills)
      this.setState({
        jobItem: formatJobDetails,
        similarJobs: formatSimilarJobs,
        apiJobStatus: apiJobStats.success,
      })
    } else {
      this.setState({
        apiJobStatus: apiJobStats.failure,
      })
    }
  }

  jobsRetry = () => {
    this.getJobDetails()
  }

  renderJobItem = () => {
    const {jobItem, similarJobs} = this.state
    if (jobItem.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        // id,
        jobDescription,
        skills,
        lifeAtCompany,

        location,
        packagePerAnnum,
        rating,
        title,
      } = jobItem[0]

      return (
        <div className="bg">
          <div>
            <div className="jobItem-bg">
              <div className="similar-img-title">
                <img
                  className="similar-img"
                  src={companyLogoUrl}
                  alt="job details company logo"
                />
                <div className="similar-title-img-con">
                  <h3 className="title">{title}</h3>
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
              <div className="heading-link-con">
                <h4 className="heading">Description</h4>
                <a className="anchor-link" href={companyWebsiteUrl}>
                  Visit
                  <BiLinkExternal className="react-icon-visit" />
                </a>
              </div>

              <p className="para">{jobDescription}</p>
              <div>
                <h4 className="skills-heading">Skills</h4>
                <ul className="skills-list">
                  {skills.map(i => (
                    <li className="skills-items" key={i.name}>
                      <img
                        className="skill-img"
                        src={i.imageUrl}
                        alt={i.name}
                      />
                      <p>{i.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="life-at-company-con">
                <div>
                  <h4 className="life-at-company-heading">Life at Company</h4>
                  <p className="life-at-company-para">
                    {lifeAtCompany.description}
                  </p>
                </div>
                <img
                  className="life-at-company-image"
                  src={lifeAtCompany.imageUrl}
                  alt="life at company"
                />
              </div>
            </div>

            <div>
              <h4 className="similar-jobs-heading">Similar jobs</h4>
              <ul className="job-list">
                {similarJobs.map(k => (
                  <SimilarJobs key={k.id} similarJobsDetails={k} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  renderJobFailure = () => (
    <div className="job-failure-bg">
      <div className="failure-width">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p className="job-failure-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="job-failure-button"
          onClick={this.jobsRetry}
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobStats.success:
        return this.renderJobItem()
      case apiJobStats.failure:
        return this.renderJobFailure()
      case apiJobStats.loading:
        return this.renderJobLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobs()}
      </>
    )
  }
}
export default JobItemDetails
