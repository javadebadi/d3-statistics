import {range} from 'd3';


/** @class Gaussian Distribution representing a Gaussian (Normal) Distribution. */
class GaussianDistribution {
    /**
     * Creates an instance of Gaussian Distribution.
     *
     * @author: Javad Ebadi
     * @param {number} mu The mean of the Gaussian Distribution.
     * @param {number} sigma The std of the Gaussian Distribution.
     */
    constructor(mu, sigma) {
      /** @private */ this.mu = mu
      /** @private */ this.sigma = sigma
    }
  
    /**
     * Creates a new Gaussian Distribution from a mean and variance.
     *
     * @param {number} mu The mean of the Gaussian Distribution.
     * @param {number} variance The variance of the Gaussian Distribution.
     * @return {GaussianDistribution} The new GaussianDistribution object.
     */
    static fromVariance(mu, variance) {
      return new GaussianDistribution(mu, Math.sqrt(variance))
    }
  
    /**
     * Find a String representation of the Gaussian Distribution.
     *
     * @override
     * @return {string} Human-readable representation of this Gaussian Distribution.
     */
    toString() {
      return `[A Gaussian Distribution object with mu = ${this.mu} and sigma = ${this.sigma}.]`
    }


    /**
     * Find the value of PDF of the Gaussian Distribution.
     *
     * @param {number} x The point where PDF value of the Gaussian Distribution is needed.
     * @return {number} The PDF value at given point `x` of the Gaussian Distribution.
     */
    pdf(x) {
        let coefficient = 1 / (this.sigma * Math.sqrt(2 * Math.PI))
        return coefficient * Math.exp(
            (-1/2) * 
            Math.pow(
                (x - this.mu)/(this.sigma), 2
                )
            )
      }


    /**
     * Find the x,y points of PDF of the Gaussian Distribution.
     *
     * @param {number} x_min The minimum limit of x point to calculate PDF of the Gaussian Distribution.
     * @param {number} x_min The maximum limit of x point to calculate PDF of the Gaussian Distribution.
     * @param {number} n_points The number of points to generate the x,y values for the Gaussian Distribution.
     * 
     * @return {Array} The Array of x and PDF(x) values of Gaussian Distribution.
     */
    pdfPoints(x_min, x_max, n_points=10) {
        const step = (x_max - x_min) / (n_points - 1);
        const xs = range(x_min, x_max + step, step);
        const ys = xs.map((x) => (this.pdf(x)));
        return [
            xs,
            ys
        ]
      }

    /**
     * Returns the Latex formula of Gaussian Distribution PDF.
     * 
     * @return {string} The string representation of Latex expression.
     */
    pdfGeneralFormulaToLatex() {
        return `{{\\frac {1}{\\sigma {\\sqrt {2\\pi }}}}e^{-{\\frac {1}{2}}\\left({\\frac {x-\\mu }{\\sigma }}\\right)^{2}}}`
    }
    
  }

  export default GaussianDistribution;