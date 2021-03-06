import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

import { Container, Header, Button, Icon, Left, Body, Title, Right, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../reducers/calendarReducer'

import moment from 'moment'
import _ from 'lodash'

import Styles from '../../configs/styles'

import * as AddCalendarEvent from 'react-native-add-calendar-event'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class AgendaScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  componentWillMount () {
    this.props.getCalendar(this.props.authReducer.userId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.calendarReducer.showSpinner !== nextProps.calendarReducer.showSpinner) {
      
    }
  }

  goBack () {

    Actions.pop();

  }

  get items () {
    const { events } = this.props.calendarReducer
    var items = this.state.items || {}

    _.each(events, (event) => {
      var day = moment(event.Date).format('YYYY-MM-DD')
      console.log('checking day ', day)
      if (!items[day]) {
        items[day] = []
      }

      items[day].push({ name: event.Name, day })
    })

    return items
  }

  addToCalendar = (item) => {
    const eventConfig = {
      title: item.name,
      startDate: moment(item.day, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      endDat: moment(item.day, 'YYYY-MM-DD').add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
      // and other options
    }

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then((eventInfo) => {
        // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
        // These are two different identifiers on iOS.
        // On Android, where they are both equal and represent the event id, also strings.
        // when { action: 'CANCELED' } is returned, the dialog was dismissed
        console.log('done');
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.log(error);
      })
  }

  render() {
    // "Name": "tested",
    // "Location": "1 35 Burton Road",
    // "Date": "Sun Apr 07 2019 01:00:00 GMT+01:00"
    return (
      <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.calendar.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        {this.props.calendarReducer.showSpinner && <Spinner />}
      {!this.props.calendarReducer.showSpinner && <Agenda
        items={this.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />}
      </Container>
    );
  }

  loadItems(day) {
    var { items } = this.state

    if (!items) {
      items = {}
    }

    if (!items[day.dateString]) {
      items[day.dateString] = []
      this.setState({
        items
      })
    } 
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <Text>{item.name}</Text>
        <Button onPress={() => { this.addToCalendar(item) }} style={{ ...Styles.PRIMARY_BUTTON }}>
          <Text styles={{ ...Styles.PRIMARY_BUTTON_TEXT }}>Add to calendar</Text>
        </Button>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text></Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaScreen);


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
