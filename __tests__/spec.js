import React from 'react';
import renderer from 'react-test-renderer';
import CarouselContacts from '../src/screen/CarouselContacts';

describe('Some component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CarouselContacts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
