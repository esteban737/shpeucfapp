/*


All Screen Exports here grouped by folder

*/

/** Export Admin **/
import AdminHub from "./Admin/AdminHub"
import CommitteesAdmin from "./Admin/CommitteesAdmin"
import ElectionAdmin from "./Admin/ElectionAdmin"
export {
    AdminHub,
    CommitteesAdmin,
    ElectionAdmin
}

/** Export Comittees **/

import CommitteePage from "./Committees/CommitteePage"
import Committees from "./Committees/Committees"
export {
    CommitteePage,
    Committees
}

/** Export Election **/
import Election from "./Election/Election"
import ElectionApplication from "./Election/ElectionApplication"
import ElectionBallot from "./Election/ElectionBallot"
import ElectionCandidates from "./Election/ElectionCandidates"
import ElectionPositions from "./Election/ElectionPositions"
export {
    Election,
    ElectionApplication,
    ElectionBallot,
    ElectionCandidates,
    ElectionPositions
}

/** Export Events **/
import Events from "./Events/Events"
export {
    Events
}

/** Export General  **/
import Dashboard from "./General/Dashboard"
import Leaderboard from "./General/Leaderboard"
import More from "./General/More"
export * from "./General/About";
export * from "./General/Forms"
export * from "./General/Resources"
export * from "./General/Version"
export {
    Dashboard,
    Leaderboard,
    More
}

/** Export User **/
import OtherProfile from "./User/OtherProfile"
import PointsBreakDown from "./User/PointsBreakDown"
import Profile from "./User/Profile"
export {
    OtherProfile,
    PointsBreakDown,
    Profile
}