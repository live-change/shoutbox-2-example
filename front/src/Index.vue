<template>
  <div class="shoutbox">
    <observe :what="$views.sessionName.sessionName()" v-slot="{ value: sessionName }">
      <command-form v-if="!sessionName" service="sessionName" action="setSessionName" v-slot="{ data }">
        <input type="text" placeholder="Enter yout name..." v-model="data.name" />
        <button type="submit">Save</button>
      </command-form>
      <command-form v-else service="shoutBox" action="postMessage" reset-on-done v-slot="{ data }">
        <span class="userName" @click="resetName">{{ sessionName.name }}</span>
        <input type="text" class="messageInput" placeholder="Write message..." v-model="data.text" />
        <button type="submit">Send!</button>
      </command-form>
    </observe>
    <observe :what="$views.shoutBox.messagesByTimestamp({ reverse: true })" v-slot="{ value: messages }">
      <div class="messages">
        <div class="message" v-for="message in messages">
          <observe :what="$views.sessionName.publicSessionName({ session: message.session })" 
            v-slot="{ value: authorName }">
            <div class="messageAuthor">
              {{ authorName?.name }}
            </div>
          </observe>
          <p class="messageText">{{ message.text }}</p>
        </div>
      </div>
    </observe>
  </div>
</template>

<script>
export default {
  inject: ['workingZone'],
  reactivePreFetch(route) {
    return [
      this.$fetch.shoutBox.messagesByTimestamp({ reverse: true })
        .with(msg => this.$fetch.sessionName.publicSessionName({
          session: msg.session.$nonEmpty() 
        })),
      this.$fetch.sessionName.sessionName()
    ]
  },
  methods: {
    resetName() {
      this.workingZone.addPromise('delete name', this.$actions.sessionName.resetSessionName())
    }
  }
}
</script>

<style>
  .shoutbox {
    display: flex;
    flex-direction: column;
  }
  form {
    display: flex;    
  }
  input[type=text] {    
    padding: 5px;
    border: 1px solid gray;
    border-radius: 3px;
  }
  .messageInput {
    flex-grow: 1;
  }
  button {
    margin-left: 4px;
    border: none;
    border-radius: 3px;
    background: lightgreen;
    cursor: pointer;
  }
  .messages {
    margin-top: 5px;
    flex-grow: 1;
    overflow-y: auto;
  }
  .message {    
    margin: 2px;
    padding: 5px 10px;
    border-radius: 10px;
    border-bottom: 1px solid #80FFB0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .messageAuthor {
    margin-right: 7px;
    font-weight: bold;
  }
  .messageText {
    margin: 2px;
  }
  .userName {
    vertical-align: center;
    padding: 4px;
    cursor: not-allowed;
  }
</style>
