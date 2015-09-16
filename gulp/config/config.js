import path      from 'path';
import basePaths from './basePaths';


var config = {

    modules: {
        "app": {
            root: basePaths.src + '/app',
            index: basePaths.src + '/app/index.html',
            dest: basePaths.dest,
            scripts: {
                index: basePaths.src + '/app/scripts/app.jsx',
                src: basePaths.src + '/app/scripts/**/*.{js,jsx}',
                dest: basePaths.dest + '/app/js'
            },
            styles: {
                index: basePaths.src + '/app/styles/main.scss',
                src: basePaths.src + '/app/styles/**/*.scss',
                dest: basePaths.dest + '/app/css'
            }
        }
    },

    dependencies: {
        list: ['react', 'react-router', 'reflux'],
        dest: basePaths.dest + '/vendor'
    }
};


export default config;
