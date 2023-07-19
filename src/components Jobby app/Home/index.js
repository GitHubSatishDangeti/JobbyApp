import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const onClickFindJobs = props => {
    const {history} = props
    // history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-bg">
        <h1 className="find-jobs-heading">Find The Job That Fits Your Life</h1>
        <p className="find-jobs-paragraph">
          Millions of people are searching for jobs, salary <br />
          information, company reviews. Find the job that fits your <br />
          abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            className="find-jobs-button"
            // onClick={onClickFindJobs}
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
