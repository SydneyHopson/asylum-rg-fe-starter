import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { useHistory } from 'react-router-dom';
import RenderLandingPage from '../components/pages/Landing/RenderLandingPage';
import { scrollTo } from 'jest-circus';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

describe('RenderLandingPage', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    useHistory.mockClear();
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders the main div', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.main')).toBeInTheDocument();
  });

  it('renders the header section', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.header')).toBeInTheDocument();
  });

  it('renders the header text', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(
      container.querySelector('.header-text-container')
    ).toBeInTheDocument();
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('renders the graphs section', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.graphs-section')).toBeInTheDocument();
  });

  it('renders the download data button', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    const downloadButton = container.querySelector('.download-data-btn');
    expect(downloadButton).toBeInTheDocument();
  });

  it('renders the middle section', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.middle-section')).toBeInTheDocument();
  });

  it('renders the HrfPhoto', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.hrf-img')).toBeInTheDocument();
  });

  it('renders the middle section text', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(
      container.querySelector('.middle-section-text-container')
    ).toBeInTheDocument();
    expect(container.querySelectorAll('h3')).toHaveLength(2);
  });

  it('renders the bottom section', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.bottom-section')).toBeInTheDocument();
  });

  it('renders the bottom container items', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });

    const bottomContainerItems = container.querySelectorAll(
      '.bottom-container-item'
    );
    expect(bottomContainerItems).toHaveLength(3);

    const leftContainerItem = bottomContainerItems[0];
    const middleContainerItem = bottomContainerItems[1];
    const rightContainerItem = bottomContainerItems[2];

    // Test content of left container item
    expect(leftContainerItem.querySelector('h2')).toHaveTextContent('36%');
    expect(leftContainerItem.querySelector('p')).toHaveTextContent(
      'By the end of the Trump administration, the average asylum office grant rate had fallen 36 percent from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal year 2020.'
    );

    // Test content of middle container item
    expect(middleContainerItem.querySelector('h2')).toHaveTextContent('5%');
    expect(middleContainerItem.querySelector('p')).toHaveTextContent(
      'The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.'
    );

    // Test content of right container item
    expect(rightContainerItem.querySelector('h2')).toHaveTextContent(
      '6X lower'
    );
    expect(rightContainerItem.querySelector('p')).toHaveTextContent(
      'Between fiscal year 2017 and 2020, the New York asylum office’s average grant rate was six times lower than the San Francisco asylum office.'
    );
  });

  it('renders the read more button', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(
      container.querySelector('.bottom-read-more-button-middle')
    ).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('renders the back to top link', () => {
    act(() => {
      render(<RenderLandingPage />, container);
    });
    expect(container.querySelector('.back-to-top')).toBeInTheDocument();
  });

  it('navigates to "/graphs" when clicking the view more data button', () => {
    const historyMock = { push: jest.fn() };
    useHistory.mockReturnValue(historyMock);

    act(() => {
      render(<RenderLandingPage />, container);
    });

    const viewMoreDataButton = container.querySelector('button');
    act(() => {
      viewMoreDataButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );
    });

    expect(historyMock.push).toHaveBeenCalledWith('/graphs');
  });

  it('scrolls to the top when clicking the back to top link', () => {
    const scrollToMock = jest.spyOn(window, 'scrollTo');
    scrollToMock.mockImplementation(() => {});

    act(() => {
      render(<RenderLandingPage />, container);
    });

    const backToTopLink = container.querySelector('.back-to-top');
    act(() => {
      backToTopLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(scrollToMock).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
  });
});
