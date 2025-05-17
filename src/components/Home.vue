<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 d-flex align-items-start mb-4 info-block">
                <img src="../assets/apply.jpg" alt="Person applying for a job" class="info-img" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <p class="info-text">Easily apply for jobs that match your skills and interests. TalentHaven streamlines
                    your application process to land your dream role faster.
                    With intuitive filtering options and a personalized dashboard, you can track your applications,
                    receive tailored job alerts, and update your profile with ease.
                    Whether you're a recent graduate or a seasoned professional, TalentHaven empowers you to take the
                    next step in your career journey confidently.
                </p>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 d-flex align-items-start mb-4 info-block">
                <img src="../assets/hiring.jpeg" alt="Hiring manager reviewing applications" class="info-img" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <p class="info-text">Post job openings and discover the right candidates quickly. Our platform helps you
                    hire smarter and more efficiently.
                    With advanced search tools, automated screening, and customizable job posts, TalentHaven gives
                    employers full control of the recruitment process.
                    Save time by reviewing only the most relevant candidates and build a talent pipeline that meets your
                    organization’s needs today and tomorrow.
                </p>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 d-flex align-items-start mb-4 info-block">
                <img src="../assets/privacy.jpg" alt="Protecting user data and privacy" class="info-img" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <p class="info-text">We prioritize your data security. All applications and company information are
                    protected with industry-standard privacy measures.
                    TalentHaven adheres to strict compliance policies to ensure user trust, including encrypted data
                    transmission, secure login mechanisms, and regular audits.
                    You can focus on finding or offering opportunities while we take care of safeguarding your digital
                    identity and sensitive information.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.info-block {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.info-text{
    text-align: justify;
}

.info-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

@media (min-width: 992px) {
  .info-block {
    text-align: left;
  }

  .info-img {
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
}

.info-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  padding: 0 0.5rem;
}

</style>
