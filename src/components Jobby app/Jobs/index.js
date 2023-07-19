import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobListItem from '../JobListItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiProfileStats = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiJobsStats = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    apiJobsStatus: apiJobsStats.initial,
    apiProfileStatus: apiProfileStats.initial,
    profileDetails: [],
    jobsData: [],
    checkboxInput: [],
    radioInput: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  onRadioInput = event => {
    this.setState({radioInput: event.target.id}, this.getJobsDetails)
  }

  onSelectCheckbox = event => {
    const {checkboxInput} = this.state

    if (event.target.checked) {
      this.setState(
        prev => ({
          checkboxInput: [...prev.checkboxInput, event.target.id],
        }),
        this.getJobsDetails,
      )
      console.log(checkboxInput)
    } else {
      const filterList = checkboxInput.filter(i => i !== event.target.id)
      this.setState({checkboxInput: filterList}, this.getJobsDetails)
    }
    console.log('not')
  }

  getProfileDetails = async () => {
    this.setState({apiProfileStatus: apiProfileStats.loading})
    const token = Cookies.get('jwt_token')
    //  const {checkboxInput, radioInput, searchInput} = this.state
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        apiProfileStatus: apiProfileStats.success,
      })
      // console.log(formattedData)
    } else {
      this.setState({
        apiProfileStatus: apiProfileStats.failure,
      })
    }
  }

  getJobsDetails = async () => {
    this.setState({
      apiJobsStatus: apiJobsStats.loading,
    })
    const {checkboxInput, radioInput, searchInput} = this.state
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${checkboxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedJobsData = data.jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        packagePerAnnum: i.package_per_annum,
        rating: i.rating,
        title: i.title,
      }))
      console.log(formattedJobsData)
      this.setState({
        jobsData: formattedJobsData,
        apiJobsStatus: apiJobsStats.success,
      })
    } else {
      this.setState({
        apiJobsStatus: apiJobsStats.failure,
      })
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {shortBio, profileImageUrl, name} = profileDetails

    return (
      <div className="profile-bg">
        <img src={profileImageUrl} alt="profile" />
        <h4 className="profile-title">{name}</h4>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  onRetry = () => {
    this.getProfileDetails()
  }

  jobsRetry = () => {
    this.getJobsDetails()
  }

  renderProfileFailure = () => (
    <div className="profile-failure">
      <button className="retry-btn-styles" onClick={this.onRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.getJobsDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  renderJobsFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.jobsRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderJobsView = () => {
    const {jobsData} = this.state

    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list">
        {jobsData.map(i => (
          <JobListItem key={i.id} jobDetails={i} />
        ))}
      </ul>
    )
  }

  renderProfile = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiProfileStats.success:
        return this.renderProfileView()
      case apiProfileStats.failure:
        return this.renderProfileFailure()
      case apiProfileStats.loading:
        return this.renderProfileLoading()

      default:
        return null
    }
  }

  renderJobs = () => {
    const {apiJobsStatus} = this.state
    switch (apiJobsStatus) {
      case apiJobsStats.success:
        return this.renderJobsView()
      case apiJobsStats.failure:
        return this.renderJobsFailure()
      case apiJobsStats.loading:
        return this.renderProfileLoading()

      default:
        return null
    }
  }

  render() {
    const profile = this.renderProfile()
    const jobs = this.renderJobs()
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg">
          <div className="first-section">
            {profile}
            <hr />
            <div className="job-type-list">
              <h4>Type of Employment</h4>
              <ul className="list">
                {employmentTypesList.map(i => (
                  <li key={i.employmentTypeId}>
                    <input
                      onChange={this.onSelectCheckbox}
                      type="checkbox"
                      id={i.employmentTypeId}
                    />
                    <label htmlFor={i.employmentTypeId}>{i.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="salary-range-list">
              <h4>Salary Range</h4>
              <ul className="list">
                {salaryRangesList.map(i => (
                  <li key={i.salaryRangeId}>
                    <input
                      onChange={this.onRadioInput}
                      name="salary"
                      type="radio"
                      id={i.salaryRangeId}
                    />
                    <label htmlFor={i.salaryRangeId}>{i.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="second-section">
            <div className="search">
              <input
                className="input-search"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
                type="search"
                placeholder="Search"
                value={searchInput}
              />
              <button
                onClick={this.onSubmitSearchInput}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {jobs}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
