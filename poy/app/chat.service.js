import SocketIOClient from 'socket.io-client';
const baseUrl = "https://poy.herokuapp.com";


export default {
  async auth() {
    const userId = await AsyncStorage.getItem('userId')
    if (userId) {
      this.socket.emit('i-dont-need-an-id');
      return;
    } else {
      this.socket.emit('i-need-id');
      this.socket.on('here-is-your-id', (id) => {
        AsyncStorage.setItem('userId', id);
        // Force a rerender in the React component
        return id;
      });
    }
  },
  sendMessage() {

  },
  getPerson() {
    return {
      image: require('./resources/img/bitmap.png'),
      isConnectedWithStripe: true,
      firstName: "Silviu",
      lastName: "RUNCEANU",
      ocupation: "UX/UI at Save Potatoes",
      company: "Design, Save Potatoes Caen",
      location: "Basse-Normandie, France",
      email: "silviu.runceanu@gmail.com",
      phoneNumber: "+40 (723) 40 99 56",
      jobIndustry: "Web Design",
      industryInterests: "Medicine, Sports",
      subindustrySkills: "Neuro, GP, Basketball",
      industrySkills: "UX/UI, Arhitecture, Product",
      interestedInIndutriesSkills: "GP, Guard",
      placeToWork: "The next train went at seven; if he were to catch that he would have to rush lik" +
        "e mad and the collection of samples was still not packed, and he did not at all " +
        "feel particularly fresh and lively. And even if he did catch the train he would " +
        "not avoid his boss's anger as the office assistant would have been there to see " +
        "the five o'clock train go, he would have put in his report about Gregor's not be" +
        "ing there a long time ago.",
      opinionAboutWorkero: "The office assistant was the boss's man, spineless, and with no understanding. W" +
        "hat about if he reported sick? But that would be extremely strained and suspicio" +
        "us as in fifteen years of service Gregor had never once yet been ill. His boss w" +
        "ould certainly come round with the doctor from the medical insurance company, ac" +
        "cuse his parents of having a lazy son, and accept the doctor's recommendation no" +
        "t to make any claim as the doctor believed that no-one was ever ill but that man" +
        "y were workshy. And what's more, would he have been entirely wrong in this case?" +
        " Gregor",
      reviews: [{
        id: 1,
        officeName: "P + A Office",
        distance: "0.5 km away",
        nrOfStars: 4,
        reviewText: "One morning, when Gregor Samsa woke from troubled dreams, he found himself trans" +
          "formed in his bed into a horrible vermin. He lay on his armour-like back, and if" +
          " he lifted his head a little he could see his brown belly, slightly domed and di" +
          "vided by arches into stiff sections. It was half past six and the hands were qui" +
          "etly moving forwards, it was even later than half past, more like quarter to sev" +
          "en. Had the alarm clock not rung?",
        urlImage: require('./resources/img/current-booking-photo.png')
      }]
    }
  },

  getConversation() {
    return [{
      id: 1,
      type: "received",
      messageText: "buna gagica"
    }, {
      id: 2,
      type: "received",
      messageText: "eu sint aici aproape de tn vrei sa fi la mn sa neo dam sunt exncitat"
    }, {
      id: 3,
      type: "sent",
      messageText: "Hello"
    }, {
      id: 4,
      type: "sent",
      messageText: "Sure, I will be tomorrow at ING Office Antwerp ’til the afternoon."
    }]
  }
}