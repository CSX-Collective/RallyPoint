import { connect } from 'react-redux'
import Profile from '../components/Profile'

const mapStateToProps = (state) => ({
  user: state.user,
  viewUser: state.viewUser,
});

// changeViewUser,
const mapDispatchToProps = ({
});

const ProfileHolder = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileHolder
