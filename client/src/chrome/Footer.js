import React, { Component } from 'react';
import { Logo } from '../svgs/icons'
import './styles/footer.scss';

export class Footer extends Component {
	render() {
		return (
			<footer>
				<a href="http://tether.com" className="login" target="_blank" rel="noopener noreferrer">
          <Logo />
        </a>
      </footer>
		)
	}
}
