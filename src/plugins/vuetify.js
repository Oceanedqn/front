import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {// Adding personnalised colors
            light: {
                primary: colors.cyan.darken3,
                secondary: colors.cyan.lighten3,
                tertiary: colors.cyan.lighten4,
                quatenary: colors.pink.accent1,
                cinqnary: colors.green.accent1

            },
        },
    },
})
