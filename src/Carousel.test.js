import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';
import Card from './Card';
import TEST_IMAGES from './_testCommon.js';

it('works when you click on the right arrow', function () {
    const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
    // expect the first image to show, but not the second
    expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
    expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector('.bi-arrow-right-circle');
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
    expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
});

// Smoke test for Card
import { render } from '@testing-library/react';
import Card from './Card';

it('renders without crashing', function () {
    render(<Card caption="Test caption" src="url" currNum={1} totalNum={3} />);
});

// Smoke test for Carousel
import Carousel from './Carousel';
import TEST_IMAGES from './_testCommon.js';

it('renders without crashing', function () {
    render(<Carousel photos={TEST_IMAGES} title="Test title" />);
});

// Snapshot test for Card
it('matches snapshot', function () {
    const { asFragment } = render(<Card caption="Test caption" src="url" currNum={1} totalNum={3} />);
    expect(asFragment()).toMatchSnapshot();
});

// Snapshot test for Carousel
it('matches snapshot', function () {
    const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="Test title" />);
    expect(asFragment()).toMatchSnapshot();
});

// Failing test for left arrow functionality
it('moves to the previous image when left arrow is clicked', function () {
    const { container } = render(<Carousel photos={TEST_IMAGES} title="Test title" />);
    const rightArrow = container.querySelector('.bi-arrow-right-circle');
    fireEvent.click(rightArrow); 
    const leftArrow = container.querySelector('.bi-arrow-left-circle');
    fireEvent.click(leftArrow); 

    expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
});

// Test for hiding arrows appropriately
it('hides the left arrow on the first image and the right arrow on the last image', function () {
    const { container } = render(<Carousel photos={TEST_IMAGES} title="Test title" />);
    expect(container.querySelector('.bi-arrow-left-circle')).toBeNull();

    const rightArrow = container.querySelector('.bi-arrow-right-circle');
    while (container.querySelector('.bi-arrow-right-circle')) {
        fireEvent.click(rightArrow); 
    }

    expect(container.querySelector('.bi-arrow-right-circle')).toBeNull(); 
});
