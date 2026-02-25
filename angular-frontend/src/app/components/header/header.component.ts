import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  intervalId: any;

  slides = [
    {
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=600&fit=crop',
      title: 'Send Love with Beautiful Flowers',
      description: 'Fresh flowers delivered to your doorstep. Perfect for every occasion and celebration.'
    },
    {
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&h=600&fit=crop',
      title: 'Sweet Moments with Cakes & Chocolates',
      description: 'Delicious cakes and premium chocolates to make every moment sweeter and memorable.'
    },
    {
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&h=600&fit=crop',
      title: 'Personalized Gifts for Special Ones',
      description: 'Unique personalized gifts and hampers crafted with love for your special people.'
    }
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
