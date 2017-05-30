import { connect } from 'react-redux'
import { searchSubmit } from '../store/searchReducer'
import App from '../components/App'

const mapStateToProps = (state) => ({
  searches: state.search.searches,
  isSubmitting: state.search.isSubmitting
})

const mapDispatchToProps = {
  searchSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
