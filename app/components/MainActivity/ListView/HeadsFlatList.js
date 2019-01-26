import React, { Component } from 'react';
import { AppRegistry, Text, View, FlatList, StyleSheet, TouchableHighlight } from 'react-native';

import HeadsItem from './ListItems/HeadsItem';


let SQLite = require('react-native-sqlite-storage');


export default class HeadsFlatList extends Component {
    constructor() {
        super();
        this.state = {
            headsDataSource: [],
            headerIndex: ''
        };

        let db = SQLite.openDatabase({ name: 'c46.db', createFromLocation: "~c46.db", location: 'Library' }, this.openCB, this.errorCB);
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM c46 WHERE type = 0', [], (tx, results) => {
                console.log("Headers query completed");

                // Get rows with Web SQL Database spec compliance.
                var data = [];

                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    data.push(results.rows.item(i));
                }

                console.log("headersLen: " + data.length);
                this.setState({ headsDataSource: data });

            });
        });

    }


    componentDidMount() {

    }

    handlePress(item) {
        console.log("handlePress: " + item._id);

        this.state.headerIndex = item._id;
        this.props.setMainFlatList(item._id);
    }

    // _renderItem = () => (
    //     <HeadsItem/>
    // );

    _renderItem = ({ item }) => (
        <TouchableHighlight onPress={() => this.handlePress(item)}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.categoryText}>{item.fulltext}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );


    render() {
        return (
            <FlatList
                data={this.state.headsDataSource}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}


const styles = StyleSheet.create({
    listView: {

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#2e3f76',
        marginBottom: 3
    },

    categoryText: {
        flex: 1,
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});

AppRegistry.registerComponent('HeadsFlatList', () => HeadsFlatList);