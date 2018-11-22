//InputSwitcher
import React, { Component } from 'react';

import _ from 'lodash'

import DatePicker from 'react-native-datepicker'

import ValidationHelper from '../../helpers/validation.helper'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import {
  StyleSheet,
  View
} from 'react-native';

import { Icon, Text, Item, Input, Label, Picker } from 'native-base';
const PickerItem = Picker.Item;

/*
"ascii-capable",
    "decimal-pad",
    default,
    "email-address",
    "name-phone-pad",
    "number-pad",
    "numbers-and-punctuation",
    numeric,
    "phone-pad",
    twitter,
    url,
    "web-search"
*/

const INPUT_KEYBOARDS = {
	TEXT: 'default',
	PASSWORD: 'default',
	NUMBER: 'numeric',
	EMAIL: 'email-address',
	DATE: 'numbers-and-punctuation',
	PHONE: 'phone-pad',
	DEFAULT: 'default',
	CURRENCY: 'numbers-and-punctuation'
}

const INPUT_AUTO_CORRECT = {
	TEXT: true,
	PASSWORD: false,
	NUMBER: false,
	EMAIL: false,
	DATE: true,
	PHONE: true,
	DEFAULT: true,
	CURRENCY: true
}

const INPUT_AUTO_CAPITALIZE = {
	TEXT: 'sentences',
	NUMBER: 'none',
	EMAIL: 'none',
	PHONE: 'none',
	DEFAULT: 'sentences',
	CURRENCY: 'none',
	PASSWORD: 'none'
}


export default class FormInput extends Component<{}> {

	constructor (props) {
	  
	  super(props);

	  this.state = {
	  	isValid: false,
	  	isDirty: false,
	  	showError: false,
	  	showSuccess: false
	  };

	
	  //this.checkIsValid(t)

	}

	componentDidMount () {

		if (!_.isNull(this.props.value) && !this.state.isDirty) {

			this.setDirty(this.props.value)

		}

	}


	componentWillReceiveProps (nextProps) {



	}

	onChangeText (newVal) {

		this.setDirty(newVal)
		
	}

	setDirty (val) {

		this.setState({
			isDirty: true
		}, () => {

			this.checkIsValid(val)

		})

	}

	checkIsValid (newVal) {

		let isValid = ValidationHelper.isValid(newVal, {
			required: this.props.required,
			inputType: this.props.type
		})

		this.setState({
			isValid: isValid
		}, () => {

			this.setInputState(newVal)

		})

	}

	setInputState (newVal) {

		let showError = false
		let showSuccess = false

		if (this.state.isDirty && !this.state.isValid) {
			
			showError = true

		}

		if (this.state.isDirty && this.state.isValid) {
			
			showError = false
			
		}

		this.setState({
			showError: showError,
			showSuccess: showSuccess
		}, () => {

			this.props.onChangeText(this.props.id, newVal, this.props.value, this.state)

		})



	}


	renderOptions (options) {

		var items = []

		_.each(options, (option, key) => {

			let label
			let value

			if (_.isString(option)) {
				label = option
				value = option
			}

			if (_.isArray(option)) {
				label = option[1]
				value = option[0]
			}

			items.push(
				<PickerItem label={label} value={value} key={key} />
				)

		})

		return items

	}

	render () {

		switch (this.props.type) {

			case INPUT_TYPES.SELECT:

				var { value, options } = this.props

				return (
					<View style={{ marginLeft: 12, marginTop: 15 }}>
						<Label>{ this.props.label }</Label>
						<Picker
							iosHeader={this.props.label}
							mode="dropdown"
							selectedValue={value}
							onValueChange={this.onChangeText.bind(this)}
							>
								{this.renderOptions(options)}
							</Picker>			
					</View>
				);

			break

			case INPUT_TYPES.DATE:

				return (
					<Item style={{ paddingBottom: 15, paddingTop: 15 }} error={this.state.showError} success={this.state.showSuccess}>
						<Label>{ this.props.label }</Label>
						<DatePicker 
						date={this.props.value}
						onDateChange={this.onChangeText.bind(this)}
						confirmBtnText="Confirm"
        				cancelBtnText="Cancel"
        				showIcon={false}
        				format="DD/MM/YYYY"
						/>
					</Item>)

			break

			default:

				var style = {}

				if (this.props.multiline) {
					style.height = 80
				}

				return (
			      <Item stackedLabel={this.props.stackedLabel} error={this.state.showError} success={this.state.showSuccess}>
			        <Label>{ this.props.label }</Label>
			        <Input 
			        	style={style}
			        	value={this.props.value}
						multiline={this.props.multiline}
						secureTextEntry={this.props.secureTextEntry}
			        	row={this.props.rows}
						autogrow={this.props.autogrow}
						placeholder={this.props.placeholder}
						autoCapitalize={this.props.disableAutoCapitalize ? 'none' : INPUT_AUTO_CAPITALIZE[this.props.type]}
						autoCorrect={INPUT_AUTO_CORRECT[this.props.type]}
			        	spellCheck={this.props.spellCheck}
			        	keyboardType={INPUT_KEYBOARDS[this.props.type]}
			        	onChangeText={this.onChangeText.bind(this)} />
			      </Item>
			)

		}
	}

}

