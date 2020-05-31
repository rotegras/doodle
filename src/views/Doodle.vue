<template>
  <v-container>
    <v-row>
      <v-col>

        <v-tabs v-model="tab">
          <v-tab v-for="tab in tabItems"
            :key="tab.index"
          >
          {{ $t(`tabTitle${tab.index}`) }}
          </v-tab>
        </v-tabs>

      </v-col>
    </v-row>

    <v-row>
      <v-col>

        <AttendanceList
          :itemsDates="this.sortedDates"
          :members="this.tableMembers"
          @updateDates="this.getDates"
          v-if="tab === 0"
        />

        <DatesList
         :propDates="this.sortedDates"
          @updateDates="this.getDates"
          v-if="tab === 1"
          />

        <MemberList
          :members="this.tableMembers"
          @updateMemberList="getMembers"
          v-if="tab === 2"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import initParse from '../utils/initParse';
import AttendanceList from '../components/doodle/AttendanceList.vue';
import DatesList from '../components/doodle/DatesList.vue';
import MemberList from '../components/doodle/MemberList.vue';

const Parse = require('parse');

export default {
  name: 'Doodle',
  components: {
    AttendanceList,
    DatesList,
    MemberList,
  },

  data: () => ({
    dates: [],
    members: [],
    tab: 0,
    tabItems: [
      { index: 0, name: 'Attendance' },
      { index: 1, name: 'Dates' },
      { index: 2, name: 'Members' },
    ],
  }),

  created() {
    initParse();
    this.getMembers();
    this.getDates();
  },

  methods: {
    getDates() {
      const datesQuery = new Parse.Query('CdbSession');
      datesQuery.find().then((items) => {
        if (items) {
          this.dates = items;
        } else {
          console.log('Nothing found, please try again');
        }
      }).then(() => {
        console.log('Dates updated');
      }).catch((error) => {
        console.log(`Error ${error.code} with message: ${error.message}`);
      });
    },
    getMembers() {
      const query = new Parse.Query('CdbMember');
      query.find().then((items) => {
        if (items) {
          this.members = items;
        } else {
          console.log('Nothing found, please try again');
        }
      }).catch((error) => {
        console.log(`Error: ${error.code} / ${error.message}`);
      });
    },
  },
  computed: {
    sortedDates() {
      const datesArray = [];
      this.dates.map((item) => {
        const newObject = {};
        newObject.sessiondate = item.get('sessiondate');
        newObject.year = item.get('sessiondate').toISOString().slice(0, 4);
        newObject.month = item.get('sessiondate').toISOString().slice(5, 2);
        if (item.get('sessiontime') !== undefined) {
          newObject.sessiontime = new Date().toISOString().slice(11, 16);
        } else {
          newObject.sessiontime = '18:35';
        }
        newObject.type = item.get('type');
        newObject.name = item.get('name');
        newObject.comments = item.get('comments');
        newObject.location = item.get('location');
        newObject.attendancelist = item.get('attendancelist');
        newObject.show = item.get('show');

        datesArray.push(newObject);
        return null;
      });
      return datesArray.sort((a, b) => b.sessiondate - a.sessiondate);
    },
    tableMembers() {
      const arrayOfMembers = [];
      this.members.map((member) => {
        const newObject = {};
        newObject.name = member.get('name');
        newObject.shoulders = member.get('shoulders');
        newObject.weight = member.get('weight');
        newObject.arm = member.get('arm');
        newObject.regular = member.get('regular');
        newObject.member = member.get('member');
        arrayOfMembers.push(newObject);
        return null;
      });
      return arrayOfMembers;
    },
  },
};
</script>

<i18n>
en:
  tabTitle0: 'Attendance'
  tabTitle1: 'Dates'
  tabTitle2: 'Members'
de:
  tabTitle0: 'Anwesenheit'
  tabTitle1: 'Dates'
  tabTitle2: 'Mitglieder'
ca:
  tabTitle0: 'Assistència'
  tabTitle1: 'Dates'
  tabTitle2: 'Membres'
</i18n>
