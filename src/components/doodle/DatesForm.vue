<template>
  <v-form class="form-adddate"
    dense
    >
    <h1 class="mb-3 amber--text">{{ this.titleForm }}</h1>

    <v-row>
      <v-col>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >

          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              prepend-icon="event"
              hint="DD/MM/YYYY"
              persistent-hint
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="date"
            format="24hr"
            @input="menu = false"
          >
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-menu
          v-model="menu2"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Time"
            :close-on-content-click="false"
              prepend-icon="mdi-clock-outline"
              hint="hh:mm"
              readonly
              v-on="on"
            />
          </template>
          <v-time-picker
            v-model="time"
            :allowed-minutes="this.allowedMinutes"
            @input="menu2 = false"
          />
        </v-menu>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field v-model="session.name"
          type="text"
          label="Ref"
          required>
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="session.type"
          type="text"
          label="Type"
          required>
        </v-text-field>
      </v-col>
    </v-row>
    <v-text-field v-model="session.location"
      type="text"
      label="Location"
      class="mb-2"
      >
    </v-text-field>
    <v-text-field v-model="session.comments"
      type="text"
      label="Comments"
      class="mb-2"
      >
    </v-text-field>
    <v-checkbox v-model="session.show"
      type="text"
      label="Edit"
      required>
    </v-checkbox>

    <v-row>
      <v-col cols="12" md="6" v-if="this.editMode">
        <v-btn v-on:click="this.saveDate"
          class="btn mb-2 amber ligthen-2 white--text"
          block
          type="button">
              Add
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" v-if="!this.editMode">
        <v-btn v-on:click="this.readThenUpdate"
            class="btn mb-2 amber ligthen-2 white--text"
            block
            type="button">
                Update
        </v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-btn
          @click="this.close"
          block
          class="btn mb-2 white grey--text"
        >
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import Parse from 'parse';

export default {
  name: 'DatesForm',
  props: {
    editedSession: {
      type: Object,
    },
    formatedDate: {
      type: String,
    },
    formatedTime: {
      type: String,
      required: true,
      default: () => '',
    },
    titleForm: {
      type: String,
      default: 'Add Date',
    },
    editMode: {
      type: Boolean,
    },
  },
  data() {
    return {
      session: this.editedSession,
      date: this.formatedDate,
      time: this.formatedTime,
      startName: this.editedSession.name,
      menu: false,
      menu2: false,
      defaultItem: {
        sessiondate: '',
        time: '',
        month: '',
        year: '',
        type: '',
        comments: '',
      },
    };
  },

  methods: {

    allowedMinutes: (v) => v % 5 === 0,

    close() {
      this.$emit('dialogIsOpen', false);
      setTimeout(() => {
        this.session = this.defaultItem;
        this.editedIndex = -1;
      }, 300);
    },

    editItem(item) {
      this.editedIndex = this.tableItems.indexOf(item);
      this.session = item;
    },

    saveDate() {
      const CdbS = Parse.Object.extend('CdbSession');
      const sessionDate = new CdbS();
      sessionDate.set(this.session);
      sessionDate.set('sessiondate', new Date(this.date));
      sessionDate.set('sessiontime', this.stringToTime(this.time));
      // sessionDate.set('sessiontime', this.time);

      if (sessionDate.get('name')) {
        console.log(sessionDate.get('sessiontime'));
        sessionDate.save()
          .then((res) => {
            console.log(`New object created with objectId: ${res.id}`);
          }, (error) => {
            console.log(`Failed to create new object, with error code: ${error.message}`);
          });
        this.$set(this.session, this.defaultItem);
        this.close();
        this.siblingUpdateList();
      } else {
        console.log('The field ref is needed');
      }
    },

    readThenUpdate() {
      const query = new Parse.Query('CdbSession');
      query.equalTo('name', this.startName);
      query.first().then((sess) => {
        if (sess) {
          console.log(`Date found with name: ${sess.get('name')}`);
          this.update(sess);
        } else {
          console.log('Nothing found, please try again');
        }
      }).catch((error) => {
        console.log(`Error: ${error.code} + ${error.message}`);
      });
    },

    update(sess) {
      sess.set(this.session);
      sess.set('sessiondate', new Date(this.date));
      sess.set('sessiontime', this.stringToTime(this.time));

      sess.save().then(() => {
        console.log('Date updated!');
        this.close();
        this.siblingUpdateList();
      }).catch((error) => {
        console.log(`Error: ${error.message}`);
      });
    },

    siblingUpdateList() {
      this.$emit('updateDates', true);
    },

    stringToTime(timestr) {
      const dat = new Date();
      const time = timestr.split(':');
      dat.setHours(time[0]);
      dat.setMinutes(time[1]);
      console.log('dat: ', dat);
      return dat;
    },

  },
  watch: {
    editedSession() {
      this.session = this.editedSession;
    },
    formatedDate() {
      this.date = this.formatedDate;
    },
    formatedTime() {
      this.time = this.formatedTime;
    },
  },
};
</script>

<style scoped>
  .form-adddate {
    background-color: #fff;
    max-width: 100%;
    margin: 0 auto;
    padding: 2rem;
  }
  input {
    padding: .25rem .5rem .25rem 2rem;
  }
  .form-adddate .v-label,
  .form-checkb {
    /* font-size: .65rem; */
    font-weight: 400;
  }
  .baux {
    background: yellow;
    border: 3px gray dashed;
  }
</style>

//TODO: fix date picker closes when selecting only hours or minutes
