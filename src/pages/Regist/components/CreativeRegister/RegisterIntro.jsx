import React, { Component } from 'react';
import styles from './index.module.scss';

export default class RegisterIntro extends Component {
  static displayName = 'RegisterIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.containerForget}>
        <div className={styles.logo}>
          <a href="#" className={styles.link}>
            <img
              className={styles.logoImg}
              src={require('./images/logo.png')}
              alt="logo"
            />
          </a>
        </div>
        <div className={styles.title}>
          技术领域智能助手 <br />
          让沟通变得更加智能、高效、便捷
        </div>
        <p className={styles.description}>Amazing Stuff is Lorem Here.ICE Team</p>
        <div className={styles.border} />
      </div>
    );
  }
}

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     height: '100vh',
//   },
//   logoLink: {
//     display: 'block',
//   },
//   logoImg: {
//     width: '88px',
//   },
//   title: {
//     marginTop: '60px',
//     fontWeight: '500',
//     fontSize: '22px',
//     lineHeight: '1.5',
//     textAlign: 'center',
//     color: '#343a40',
//   },
//   description: {
//     marginTop: '30px',
//     fontSize: '13px',
//     color: '#212529',
//   },
//   border: {
//     position: 'absolute',
//     top: '100px',
//     bottom: '100px',
//     right: '0',
//     background: '#ffffff',
//     width: '30px',
//     boxShadow: '-19px 0 35px -7px #F5F5F5',
//   },
// };
