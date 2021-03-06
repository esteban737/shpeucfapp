import React, { Component } from "react";
import { ScrollView, View, Text, Dimensions, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { PickerInput, Input, Button, Spinner, DatePicker } from "../general";
import collegesJson from "../../data/Colleges.json";
import countriesJson from "../../data/Countries.json";
import {
	firstNameChanged,
	lastNameChanged,
	emailChanged,
	collegeChanged,
	majorChanged,
	passwordChanged,
	pointsChanged,
	privilegeChanged,
	pictureChanged,
	continentChanged,
	nationalityChanged,
	genderChanged,
	birthDateChanged,
	confirmPasswordChanged,
	registrationError,
	quoteChanged,
	goToLogIn,
	editUser,
	goToProfile
} from "../../ducks";

const dimension = Dimensions.get("screen");

const collegeNames = Object.keys(collegesJson);
let colleges = {};
collegeNames.map(college => { colleges[college] = collegeNames[college] });

const continents = Object.keys(countriesJson);
let countries = {};
continents.map(continent => { countries[continent] = countriesJson[continent] });

class EditProfileForm extends Component {
	checkPrivilege(level) {
		return this.props.privilege && this.props.privilege[level];
	}

	onButtonPress() {
		const {
			firstName,
			lastName,
			email,
			college,
			major,
			registrationError,
			continent,
			nationality,
			gender,
			birthday,
			quote
		} = this.props;

		const ucfStudentEmail = new RegExp(/^[A-Za-z0-9._%+-]+@(knights.|)ucf.edu$/i);

		if (this.checkPrivilege("eboard")) {
			if (firstName === "") {
				registrationError("Please enter your first name");
			}
			else if (lastName === "") {
				registrationError("Please enter your last name");
			}
			else if (email === "") {
				registrationError("Please enter your school email");
			}
			else if (!ucfStudentEmail.test(email)) {
				registrationError('Please use a "knights.ucf.edu", or "ucf.edu" email for registration');
			}
			else if (nationality === "") {
				registrationError("Please enter your country of origin");
			}
			else if (birthday === "") {
				registrationError("Please enter your date of birth");
			}
			else if (college === "") {
				registrationError("Please enter college");
			}
			else if (major === "") {
				registrationError("Please enter major");
			}
			else {
				editUser(firstName, lastName, email, college, major, quote, continent, nationality, gender, birthday);
				Actions.pop();
			}
		}
		else if (college === "") {
			registrationError("Please enter college");
		}
		else if (major === "") {
			registrationError("Please enter major");
		}
		else {
			editUser(firstName, lastName, email, college, major, quote, continent, nationality, gender, birthday);
			Actions.pop();
		}
	}

	renderError() {
		if (this.props.error)
			return (
				<View>
					<Text style = { styles.errorTextStyle }>
						{ this.props.error }
					</Text>
				</View>
			);
	}

	renderConfirmButton() {
		return (
			<Button
				title = { "Confirm" }
				onPress = { this.onButtonPress.bind(this) }
			/>
		);
	}

	renderCancelButton() {
		return (
			<Button
				title = { "Cancel" }
				onPress = { () => Actions.pop() }
			/>
		);
	}

	renderButtons() {
		if (this.props.loading)
			return (
				<View style = {{ marginTop: 40, marginBottom: 20 }}>
					<Spinner />
				</View>
			);

		return (
			<View style = {{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", position: "absolute", bottom: dimension.height * 0.032, width: "100%" }}>
				<View style = {{ flex: 0.45 }}>
					{ this.renderConfirmButton() }
				</View>
				<View style = {{ flex: 0.45 }}>
					{ this.renderCancelButton() }
				</View>
			</View>
		);
	}
	renderCollegePickers() {
		const {
			college,
			collegeChanged,
			major,
			majorChanged
		} = this.props;

		const p1 = college && college && college !== ""
			? <PickerInput
				title = { "Major" }
				value = { major }
				data = { colleges[college] }
				placeholder = { "Select major" }
				onSelect = { (text) => majorChanged(text) }
			/>
			: <View></View>;

		return (
			<View>
				<PickerInput
					title = { "Colleges" }
					value = { college }
					data = { colleges }
					placeholder = { "Select college" }
					onSelect = { (text) => collegeChanged(text) } />
				{ p1 }

			</View>
		);
	}

	renderCountryPickers() {
		const {
			continent,
			continentChanged,
			nationalityChanged,
			nationality
		} = this.props;

		const p1 = continent && continent && continent !== "" && continent !== "Do not wish to disclose"
			? <PickerInput
				title = { "Nationality" }
				value = { nationality }
				data = { countries[continent] }
				placeholder = { "Select country of origin" }
				onSelect = { (text) => nationalityChanged(text) }
			/>
			: <View></View>;

		return (
			<View>
				<PickerInput
					title = { "Continent" }
					value = { continent }
					data = { continents }
					placeholder = { "Select continent of origin" }
					onSelect = { (text) => continentChanged(text) } />
				{ p1 }

			</View>
		);
	}

	renderIfEboard() {
		const {
			firstName,
			firstNameChanged,
			lastName,
			lastNameChanged,
			email,
			emailChanged,
			gender,
			genderChanged,
			birthday,
			birthDateChanged
		} = this.props;
		if (this.checkPrivilege("eboard"))
			return (
				<View>
					<Input
						placeholder = "First Name"
						value = { firstName }
						onChangeText = { (text) => firstNameChanged(text) }
					/>
					<Input
						placeholder = "Last Name"
						value = { lastName }
						onChangeText = { (text) => lastNameChanged(text) }
					/>
					<Input
						placeholder = "School Email"
						keyboardType = "email-address"
						value = { email }
						onChangeText = { (text) => emailChanged(text) }
					/>
					<PickerInput
						title = { "Gender" }
						value = { gender }
						data = { ["Female", "Male", "Other", "Do not wish to disclose"] }
						placeholder = { "Select your gender" }
						onSelect = { (text) => genderChanged(text) }
					/>
					{ this.renderCountryPickers() }
					{ this.renderCollegePickers() }

					<DatePicker
						placeholder = { "Birthday" }
						value = { birthday }
						onSelect = { (text) => birthDateChanged(text) }
					/>
				</View>
			);
	}

	renderPickers() {
		const {
			college,
			collegeChanged,
			majorChanged
		} = this.props;

		const p1 = college && college !== ""
			? <PickerInput
				title = { "Colleges" }
				value = { this.props.major }
				data = { majorNames[college] }
				placeholder = { "Select College" }
				onSelect = { (text) => majorChanged(text) }
			/>
			: <View></View>;

		return (
			<View>
				<PickerInput
					title = { "Colleges" }
					value = { this.props.college }
					data = { collegeNames }
					placeholder = { "Select College" }
					onSelect = { (text) => collegeChanged(text) } />
				{ p1 }
			</View>
		);
	}

	render() {
		let content = this.renderPickers();

		if (this.checkPrivilege("eboard")) content = this.renderIfEboard();

		return (
			<SafeAreaView style = { styles.formContainerStyle }>
				<View style = {{ backgroundColor: "black", flex: 1 }}>
					<View style = {{ flex: 0.02 }}></View>
					<View style = { styles.headerStyle }>
						<Text style = { styles.headerTextStyle }>{ this.props.title }</Text>
					</View>
					<View style = {{ flex: 0.02 }}></View>
					<ScrollView
						ref = { (ref) => this.scrollView = ref }
						style = { styles.scrollView }>
						<View>
							{ content }
						</View>
					</ScrollView>
					<View style = {{ flex: 0.5 }}></View>
					{ this.renderError() }
					{ this.renderButtons() }
				</View>
				<View style = {{ height: dimension.height * 0.08, backgroundColor: "black" }}></View>
			</SafeAreaView>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: "flex-end"
	},
	itemStyle: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		borderBottomColor: "#0002",
		borderBottomWidth: 1
	},
	itemTextStyle: {
		paddingTop: dimension.height * 0.03,
		paddingBottom: dimension.height * 0.03,
		flex: 1,
		fontSize: 16,
		alignSelf: "center"
	},
	formContainerStyle: {
		flex: 1,
		backgroundColor: "#0c0b0b"
	},
	headerStyle: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		flex: 0.5
	},
	headerTextStyle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#e0e6ed"
	},
	errorTextStyle: {
		fontSize: 14,
		alignSelf: "center",
		color: "red",
		fontWeight: "bold",
		padding: 10
	},
	pickerTextInput: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	scrollView: {
		backgroundColor: "black",
		height: "50%",
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: "5%",
		paddingRight: "5%"
	},
	titleStyle: {
		flex: 0.13,
		alignSelf: "center",
		fontSize: 20
	},
	buttonStyle: {
		flex: 1,
		alignSelf: "center"
	},
	flatlistStyle: {
		flex: 0.8
	},
	buttonContainer: {
		flex: 0.2,
		flexDirection: "row",
		borderTopColor: "#0001",
		borderTopWidth: 1
	},
	textStyle: {
		flex: 1,
		alignSelf: "center",
		fontSize: 18,
		paddingTop: 5
	},
	modalBackground: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0003",
		margin: 0,
		height: dimension.height,
		width: dimension.width
	},
	modalStyle: {
		height: dimension.height * 0.4,
		width: dimension.width * 0.8,
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 12
	}
};

const mapStateToProps = ({ user }) => {
	const {
		firstName,
		lastName,
		email,
		college,
		major,
		continent,
		nationality,
		gender,
		birthday,
		picture,
		points,
		privilege,
		error,
		loading,
		quote
	} = user;

	return {
		firstName,
		lastName,
		email,
		college,
		major,
		continent,
		nationality,
		gender,
		birthday,
		picture,
		points,
		privilege,
		error,
		loading,
		quote
	};
};

const mapDispatchToProps = {
	firstNameChanged,
	lastNameChanged,
	emailChanged,
	collegeChanged,
	majorChanged,
	passwordChanged,
	pointsChanged,
	privilegeChanged,
	pictureChanged,
	continentChanged,
	nationalityChanged,
	genderChanged,
	birthDateChanged,
	confirmPasswordChanged,
	registrationError,
	quoteChanged,
	goToLogIn,
	editUser,
	goToProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);